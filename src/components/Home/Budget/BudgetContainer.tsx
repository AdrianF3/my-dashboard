import React, { Suspense, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Transaction, BankAccount, transactions, bankAccounts } from '../../../types/Banking.types';
import { calcBankDetails } from './BudgetHelpers';
import BudgetOverview from './BudgetOverview';
import TransactionView from './TransactionView';
import { Timestamp } from 'firebase/firestore';
import { GrTransaction } from 'react-icons/gr';
import { MdCalendarViewMonth, MdTimeline } from 'react-icons/md';
import { TbSortAscending2, TbSortDescending2 } from 'react-icons/tb';
import TimelineView from './TimelineView';
import MonthlyView from './MonthlyView';


const BudgetContainer: React.FC = () => {
    const [budgetStatus, setBudgetStatus] = useState<string>('loading');
    const [budgetModal, setBudgetModal] = useState<string>('');
    const [budgetData, setBudgetData] = useState<Transaction[]>([]);
    const [accountData, setAccountData] = useState<BankAccount[]>([]);
    const [budgetDetails, setBudgetDetails] = useState<any>({});

    React.useEffect(() => {
        setBudgetData(transactions);
        setAccountData(bankAccounts);

        const calcReturnValues = calcBankDetails(bankAccounts, transactions);

        

        setBudgetDetails(calcReturnValues);

        if (transactions.length === 0) {
            setBudgetStatus('empty');
        } else {
            setBudgetStatus('ready');
        }
    }, []);
    

    // Function to toggle the visibility of an account in budgetDetails.detailedSummaries
    const toggleAccountVisibility = (accountID: string) => {
        setBudgetDetails((prevDetails: any) => {
            const updatedDetails = {
                ...prevDetails,
                detailedSummaries: { ...prevDetails.detailedSummaries }
            };

            

            if (updatedDetails.detailedSummaries[accountID]) {
                updatedDetails.detailedSummaries[accountID] = {
                    ...updatedDetails.detailedSummaries[accountID],
                    visible: !updatedDetails.detailedSummaries[accountID].visible
                };
            }            

            return updatedDetails;
        });
    };

    // Function to update displayStartDate and displayEndDate and filter transactions
    const updateDateRange = (start: Date | null, end: Date | null) => {
        setBudgetDetails((prevDetails: any) => {
            const displayStartDate = start ? Timestamp.fromDate(start) : prevDetails.budgetStartDate;
            const displayEndDate = end ? Timestamp.fromDate(end) : prevDetails.budgetEndDate;

            // Clone and update the detailedSummaries with filtered transactions
            const updatedSummaries = Object.keys(prevDetails.detailedSummaries).reduce((acc, accountID) => {
                const accountSummary = prevDetails.detailedSummaries[accountID];
                
                // Filter transactions based on the date range
                const filteredTransactions = accountSummary.transactions.filter((tx: Transaction) => {
                    const txDate = tx.date.toDate().getTime();
                    return txDate >= displayStartDate.toDate().getTime() && txDate <= displayEndDate.toDate().getTime();
                });

                acc[accountID] = {
                    ...accountSummary,
                    transactions: filteredTransactions,
                };

                return acc;
            }, {} as Record<string, any>);

            return {
                ...prevDetails,
                displayStartDate,
                displayEndDate,
                detailedSummaries: updatedSummaries,
            };
        });
    };

    const updateViewSortOptions = (viewOptions: string | null, sortOptions: string | null) => {

        if (viewOptions) {
            setBudgetDetails((prevDetails: any) => {
                return {
                    ...prevDetails,
                    viewOptions
                }
            })
        }
        if (sortOptions) {        
            
            setBudgetDetails((prevDetails: any) => {
                return {
                    ...prevDetails,
                    sortOptions
                }
            })
        }

    }    

    if (budgetStatus === 'empty') {
        return <div>No events could be found...</div>;
    }

    if (budgetStatus === 'error') {
        return <div>There was an error loading your budget details, please refresh</div>;
    }

    return (
        <Suspense fallback={<div>Loading budget data...</div>}>
            <section className="flex flex-col justify-center bg-slate-700/20 p-4 rounded">

                {/* Budget Details and Display Options */}
                <div className='flex flex-row'>
                    {/* Left Section */}
                    <div className='flex flex-col m-auto text-center'>
                        <h1 className="text-lg font-bold mb-4">Budget Overview</h1>
                        {/* Budget Data */}
                        <div className='flex flex-col m-2'>
                            <p>Data Available</p>
                            <p><strong>From:</strong> {budgetDetails.budgetStartDate?.toDate().toLocaleDateString()}</p>
                            <p><strong>To:</strong> {budgetDetails.budgetEndDate?.toDate().toLocaleDateString()}</p>
                        </div>                    
                        <p>Currently Viewing</p>
                        <div className='flex flex-col'>
                            <div className='mr-4'>
                                <label><strong>From:</strong></label>
                                <DatePicker
                                    selected={budgetDetails.displayStartDate?.toDate()}
                                    onChange={(date) => updateDateRange(date, budgetDetails.displayEndDate?.toDate())}
                                    dateFormat="MMMM d, yyyy"
                                    className="input input-bordered"
                                />
                            </div>
                            <div>
                                <label><strong>To:</strong></label>
                                <DatePicker
                                    selected={budgetDetails.displayEndDate?.toDate()}
                                    onChange={(date) => updateDateRange(budgetDetails.displayStartDate?.toDate(), date)}
                                    dateFormat="MMMM d, yyyy"
                                    className="input input-bordered"
                                />
                            </div>
                        </div>
                    </div>
                    {/* Right Section */}
                    <div className='flex flex-col mx-auto min-w-[250px] max-w-sm justify-center'>
                        {/* Options for Different Views and Sorting Options */}                            
                        {/* View Options */}
                        <div className='flex flex-row min-w-[250px] gap-4 max-w-sm justify-center'>
                            {/* Transaction View */}
                            <button className={`btn ${budgetDetails.viewOptions === 'Transaction' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => updateViewSortOptions('Transaction', null)}>
                                <GrTransaction />
                                Transactions
                            </button>
                            {/* Monthly View */}
                            <button className={`btn ${budgetDetails.viewOptions === 'Month' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => updateViewSortOptions('Month', null)}>
                                <MdCalendarViewMonth />
                                Monthly
                            </button>
                            {/* Timeline View */}
                            <button className={`btn ${budgetDetails.viewOptions === 'Timeline' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => updateViewSortOptions('Timeline', null)}>
                                <MdTimeline />
                                Timeline
                            </button>
                        </div>
                        {/* Sort Options */}
                        { budgetDetails.viewOptions === 'Transaction' ? <>
                            <div className='flex flex-col gap-2 p-4 min-w-[250px] max-w-sm justify-center'>
                                {/* Sort Ascending */}
                                <button className={`btn ${budgetDetails.sortOptions === 'Ascending' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => updateViewSortOptions(null, 'Ascending')}>
                                    <TbSortAscending2 />
                                    Ascending
                                </button>
                                {/* Sort Descending */}
                                <button className={`btn ${budgetDetails.sortOptions === 'Descending' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => updateViewSortOptions(null, 'Descending')}>
                                    <TbSortDescending2 />
                                    Descending
                                </button>                                
                            </div>
                        </> : null }                        
                    </div>

                    {/* Third Section */}
                    <div className='flex flex-col m-auto gap-4 min-w-[250px] max-w-sm justify-center'>
                        {/* Add Transactions Button */}
                        <button className='btn btn-primary'>Add Transaction</button>


                        {/* Upload CSV button */}
                        <button className='btn btn-primary'>Upload CSV File</button>
                    </div>
                </div>
                
                <div className='flex flex-col'>
                    <BudgetOverview 
                        detailedSummaries={budgetDetails.detailedSummaries} 
                        toggleAccountVisibility={toggleAccountVisibility}
                        />
                    { budgetDetails.detailedSummaries ? <>
                        {/* Filter By View Options */}
                        { budgetDetails.viewOptions === 'Transaction' ?
                        <TransactionView budgetDetails={budgetDetails} /> : null } 
                        { budgetDetails.viewOptions === 'Timeline' ?
                        <TimelineView budgetDetails={budgetDetails} /> : null } 
                        { ( budgetDetails.viewOptions === 'Month' && budgetDetails.budgetEndDate ) ?
                        <MonthlyView budgetDetails={budgetDetails} /> : null } 
                            
                    </> : null}
                </div>
            </section>
        </Suspense>
    );
};

export default BudgetContainer;
