/* ─────────────────────────────────────────────
   FORD PREMIUM — Scroll + Animações
   ───────────────────────────────────────────── */

(function () {

    /* ── Header scroll class ── */
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function () {
            header.classList.toggle('scrolled', window.scrollY > 50);
        }, { passive: true });
    }

    /* ── AOS init ── */
    document.addEventListener('DOMContentLoaded', function () {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 750,
                easing: 'ease-out-quart',
                once: true,
                offset: 50
            });
        }
    });

    /* ── Counter animation para .stat-value ── */
    function animateCount(el, target, duration) {
        const start = performance.now();
        const from  = 0;

        function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased    = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(from + (target - from) * eased)
                               .toLocaleString('pt-BR');
            if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
    }

    document.addEventListener('DOMContentLoaded', function () {
        const stats = document.querySelectorAll('.stat-value[data-count]');
        if (!stats.length) return;

        setTimeout(function () {
            stats.forEach(function (el) {
                animateCount(el, parseInt(el.dataset.count, 10), 1600);
            });
        }, 500);
    });

    /* ── Backdrop do modal de comparação ── */
    document.addEventListener('DOMContentLoaded', function () {
        if (typeof ShowCompare !== 'function') return;

        const backdrop = document.querySelector('.compare-backdrop');
        if (!backdrop) return;

        const _show = ShowCompare;
        const _hide = HideCompare;

        ShowCompare = function () {
            _show();
            backdrop.style.display = 'block';
        };

        HideCompare = function () {
            _hide();
            backdrop.style.display = 'none';
        };

        backdrop.addEventListener('click', function () {
            HideCompare();
        });
    });

})();
