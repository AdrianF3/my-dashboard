import React, { Suspense, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Transaction, BankAccount, transactions, bankAccounts } from '../../../types/Banking.types';
import { calcBankDetails } from './BudgetHelpers';
import BudgetOverview from './BudgetOverview';
import TransactionView from './TransactionView';
import { Timestamp } from 'firebase/firestore';

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

    console.log('budgetDetails', budgetDetails)
    console.log('budgetData', budgetData)

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

            console.log('updatedDetails', updatedDetails);

            return updatedDetails;
        });
    };

    // Function to update displayStartDate and displayEndDate
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


    if (budgetStatus === 'empty') {
        return <div>No events could be found...</div>;
    }

    if (budgetStatus === 'error') {
        return <div>There was an error loading your budget details, please refresh</div>;
    }

    return (
        <Suspense fallback={<div>Loading budget data...</div>}>
            <div className="my-4 bg-slate-700/20 p-4 rounded">
                <h1 className="text-lg font-bold mb-4">Budget Overview</h1>
                {/* Budget Data */}
                <div className='flex flex-col m-2'>
                    <p>Data Available</p>
                    <p><strong>From:</strong> {budgetDetails.budgetStartDate?.toDate().toLocaleDateString()}</p>
                    <p><strong>To:</strong> {budgetDetails.budgetEndDate?.toDate().toLocaleDateString()}</p>
                </div>
                {/* Budget Filters */}
                <div className='flex flex-col m-2'>
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
                <BudgetOverview 
                    detailedSummaries={budgetDetails.detailedSummaries} 
                    toggleAccountVisibility={toggleAccountVisibility}
                />
                { budgetDetails.detailedSummaries ? <>
                <TransactionView detailedSummaries={budgetDetails.detailedSummaries} />
                </> : null}
            </div>
        </Suspense>
    );
};

export default BudgetContainer;