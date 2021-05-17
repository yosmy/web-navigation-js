import React, {useState} from "react";
import QueryString from "query-string";
import {createBrowserHistory} from "history";

const history = createBrowserHistory();

const useUrl = (initialUrl) => {
    const [url, internalSetUrl] = useState(
        history.location.pathname !== "/"
            ? {
                location: history.location.pathname,
                payload: QueryString.parse(history.location.search)
            }
            : initialUrl
    );

    const setUrl = (newUrl) => {
        if (
            url.location === newUrl.location
            && url.payload === newUrl.payload
        ) {
            return;
        }

        if (
            newUrl.location.startsWith("http://")
            || newUrl.location.startsWith("https://")
        ) {
            window.open(
                newUrl,
                "_blank"
            );

            return;
        }

        if (
            newUrl.target === "blank"
        ) {
            window.open(
                `${newUrl.location}?${QueryString.stringify(newUrl.payload)}`,
                "_blank",
            );

            return;
        }

        internalSetUrl({
            location: newUrl.location,
            payload: newUrl.payload
        });

        history.push(`${newUrl.location}?${QueryString.stringify(newUrl.payload)}`);
    }

    return [url, setUrl];
}

export {useUrl}