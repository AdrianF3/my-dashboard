import React, { Suspense } from 'react';
import { Transaction, BankAccount, transactions, bankAccounts } from '../../../types/Banking.types';
import { calcBankDetails } from './BudgetHelpers';
import BudgetOverview from './BudgetOverview';
import TransactionView from './TransactionView';

const BudgetContainer: React.FC = () => {
    const [budgetStatus, setBudgetStatus] = React.useState<string>('loading');
    const [budgetModal, setBudgetModal] = React.useState<string>('');
    const [budgetData, setBudgetData] = React.useState<Transaction[]>([]);
    const [accountData, setAccountData] = React.useState<BankAccount[]>([]);
    const [budgetDetails, setBudgetDetails] = React.useState<any>({});

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
                <p><strong>Budget Start Date:</strong> {budgetDetails.budgetStartDate?.toDate().toLocaleDateString()}</p>
                <p><strong>Budget End Date:</strong> {budgetDetails.budgetEndDate?.toDate().toLocaleDateString()}</p>
                <BudgetOverview detailedSummaries={budgetDetails.detailedSummaries} />
                <TransactionView transactions={budgetData} />
            </div>
        </Suspense>
    );
};

export default BudgetContainer;
