import { Transaction } from '@/types/Banking.types';
import React from 'react';

const BudgetOverview: React.FC<{ detailedSummaries: any, toggleAccountVisibility: (accountID: string) => void }> = ({ detailedSummaries, toggleAccountVisibility }) => {
    if (!detailedSummaries) return null;

    return (
        <div className="my-4 bg-slate-700/20 p-4 rounded">
            <h2 className="text-lg font-bold mb-4">Account Overview</h2>
            <section className="flex flex-wrap justify-start gap-4">

                {Object.keys(detailedSummaries).map((accountID) => {
                    const account = detailedSummaries[accountID];                    

                    // Find the date of the most recent transaction
                    const mostRecentTransaction = account.transactions
                        .reduce((latest: any, transaction: Transaction) => 
                            transaction.date > latest.date ? transaction : latest, 
                            account.transactions[0]);

                    return (
                        <div key={accountID} className="relative flex-1 min-w-[250px] max-w-sm">

                            <div className="card bg-primary text-primary-content w-full">
                                <div className={`card-body border-2 border-black ${account.visible ? 'border-0' : 'border-dashed bg-slate-200/40'}`}>
                                    <h2 className="card-title">{account.name}</h2>
                                    <p>Most Recent Transaction: {mostRecentTransaction.date.toDate().toLocaleDateString()}</p>
                                    <p className="">${account.currentBalance.toFixed(2)}</p>                                    
                                    <div className="card-actions justify-end pt-10">
                                        <button className="btn" onClick={() => toggleAccountVisibility(account.accountID)}>
                                            Toggle Visibility
                                        </button>
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
