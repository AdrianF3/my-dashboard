import { Transaction } from '@/types/Banking.types';
import React from 'react';

const BudgetOverview: React.FC<{ detailedSummaries: any }> = ({ detailedSummaries }) => {
    if (!detailedSummaries) return null;

    return (
        <div className="my-4 bg-slate-700/20 p-4 rounded">
            <h2 className="text-lg font-bold mb-4">Account Overview</h2>
            <section className="flex flex-auto justify-between gap-4">

                {Object.keys(detailedSummaries).map((accountID) => {
                    const account = detailedSummaries[accountID];

                    // Find the date of the most recent transaction
                    const mostRecentTransaction = account.transactions
                        .reduce((latest: any, transaction: Transaction) => 
                            transaction.date > latest.date ? transaction : latest, 
                            account.transactions[0]);

                    return (
                        <div key={accountID} className="relative">
                            <div className="indicator absolute top-0 right-0 z-10">
                                <span className="indicator-item badge badge-primary">${account.currentBalance.toFixed(2)}</span>
                            </div>
                            <div className="card bg-primary text-primary-content w-96">
                                <div className="card-body">
                                    <h2 className="card-title">{account.name}</h2>
                                    <p>As of: {mostRecentTransaction.date.toDate().toLocaleDateString()}</p>
                                    <div className="card-actions justify-end pt-10">
                                        <button className="btn">View Transactions</button>
                                        <button className="btn">Edit Account</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </section>
        </div>
    );
};

export default BudgetOverview;
