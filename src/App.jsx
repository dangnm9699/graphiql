import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { GraphiQL } from 'graphiql';
import 'graphiql/graphiql.min.css';

export default function App() {
    const [input, setInput] = useState('');
    const [accessKey, setAccessKey] = useState('');
    const [loading, setLoading] = useState(true);

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        setAccessKey(input);
        window.sessionStorage.setItem('ak', input);
    }, [input]);

    const fetcher = useMemo(() => {
        return async function (graphQLParams) {
            const data = await fetch(
                process.env.REACT_APP_GRAPHQL_ENDPOINT,
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'X-B2B-Access-Token': accessKey
                    },
                    body: JSON.stringify(graphQLParams),
                    // mode: 'no-cors'
                },
            );
            return data.json().catch(() => data.text());
        }
    }, [accessKey]);

    useEffect(() => {
        const ak = window.sessionStorage.getItem('ak');
        if (ak) {
            setAccessKey(ak);
        }
        setLoading(false);
    }, []);

    return (
        loading ? (
            null
        ) : (
            accessKey ? (
                <GraphiQL
                    fetcher={fetcher}
                    isHeadersEditorEnabled={false}
                    storage={window.sessionStorage}
                />
            ) : (
                <div className="formbold-main-wrapper">
                    <div className="formbold-form-wrapper">
                        <form onSubmit={onSubmit}>
                            <div className="formbold-email-subscription-form">
                                <input
                                    type="text"
                                    name="access_key"
                                    id="access_key"
                                    placeholder="Enter your access key"
                                    className="formbold-form-input"
                                    value={input}
                                    onInput={(e) => setInput(e.target.value)}
                                />

                                <button className="formbold-btn" type="submit">
                                    Go
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_1661_1158)">
                                            <path d="M2.494 0.937761L14.802 7.70709C14.8543 7.73587 14.8978 7.77814 14.9282 7.8295C14.9586 7.88087 14.9746 7.93943 14.9746 7.99909C14.9746 8.05875 14.9586 8.11732 14.9282 8.16868C14.8978 8.22005 14.8543 8.26232 14.802 8.29109L2.494 15.0604C2.44325 15.0883 2.3861 15.1026 2.32818 15.1017C2.27027 15.1008 2.21358 15.0848 2.16372 15.0553C2.11385 15.0258 2.07253 14.9839 2.04382 14.9336C2.01511 14.8833 2.00001 14.8264 2 14.7684V1.22976C2.00001 1.17184 2.01511 1.11492 2.04382 1.06461C2.07253 1.0143 2.11385 0.97234 2.16372 0.942865C2.21358 0.913391 2.27027 0.897419 2.32818 0.896524C2.3861 0.895629 2.44325 0.909842 2.494 0.937761ZM3.33333 8.66576V13.0771L12.5667 7.99909L3.33333 2.92109V7.33243H6.66667V8.66576H3.33333Z" fill="white" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_1661_1158">
                                                <rect width="16" height="16" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )
        )
    );
};
