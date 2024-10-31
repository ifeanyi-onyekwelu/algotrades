import { useEffect } from "react";

const TradingViewWidget = () => {
    useEffect(() => {
        // Check if the script is already added to avoid duplication
        if (!document.getElementById("tradingview-widget-script")) {
            // Create the script element
            const script = document.createElement("script");
            script.id = "tradingview-widget-script"; // Give an ID to the script
            script.src =
                "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
            script.async = true;

            // Add the configuration for the widget
            script.innerHTML = JSON.stringify({
                symbols: [
                    {
                        proName: "FOREXCOM:SPXUSD",
                        title: "S&P 500 Index",
                    },
                    {
                        proName: "FOREXCOM:NSXUSD",
                        title: "US 100 Cash CFD",
                    },
                    {
                        proName: "FX_IDC:EURUSD",
                        title: "EUR to USD",
                    },
                    {
                        proName: "BITSTAMP:BTCUSD",
                        title: "Bitcoin",
                    },
                    {
                        proName: "BITSTAMP:ETHUSD",
                        title: "Ethereum",
                    },
                ],
                showSymbolLogo: true,
                isTransparent: false,
                displayMode: "adaptive",
                colorTheme: "dark",
                locale: "en",
            });

            // Append the script to the widget container
            document.getElementById("tradingview-widget")?.appendChild(script);
        }
    }, []);

    return (
        <div className="tradingview-widget-container">
            <div id="tradingview-widget"></div>
        </div>
    );
};

export default TradingViewWidget;
