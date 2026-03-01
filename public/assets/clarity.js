(function (c, l, a, r, i, t, y) {
    if (
        window.location.hostname !== "propiohq.com" &&
        window.location.hostname !== "www.propiohq.com" &&
        window.location.hostname !== "app.propiohq.com"
    ) {
        return;
    }

    c[a] =
        c[a] ||
        function () {
            (c[a].q = c[a].q || []).push(arguments);
        };
    t = l.createElement(r);
    t.async = 1;
    t.src = "https://www.clarity.ms/tag/" + i;
    y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
})(window, document, "clarity", "script", "vmjjx02dq8");
