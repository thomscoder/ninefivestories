import React, { useEffect, useRef } from 'react';

const utterancesTheme = (_theme) => {
    const commentsBox = document.querySelector('.utterances-frame');
    if (commentsBox) {
        const theme = _theme === 'light' ? 'github-light' : 'github-dark'
        const message = {
            type: 'set-theme',
            theme: theme
        };
        const iframe = document.querySelector('.utterances-frame');
        iframe.contentWindow.postMessage(message, 'https://utteranc.es');
    }
}

export default function Comments() {
    const commentsBox = useRef(null);
    const theme = typeof window !== 'undefined' && window.localStorage.getItem('theme') === 'dark' ? "github-dark" : "github-light";

    useEffect(() => {
        const scriptEl = document.createElement('script');
        scriptEl.setAttribute("src", "https://utteranc.es/client.js");
        scriptEl.setAttribute("crossorigin","anonymous");
        scriptEl.setAttribute("async", true);
        scriptEl.setAttribute("repo", "thomscoder/ninefivestories");
        scriptEl.setAttribute("issue-term", "pathname");
        scriptEl.setAttribute("theme", theme);
        commentsBox.current.appendChild(scriptEl);

        document.addEventListener('theme-change', ({detail: {theme}}) => {
            console.log(theme)
            utterancesTheme(theme)
        })

    });

    return (
        <div ref={commentsBox}></div>
    )
}