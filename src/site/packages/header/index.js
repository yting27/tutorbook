/**
 * @license
 * Copyright (C) 2020 Tutorbook
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option) any
 * later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS 
 * FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more 
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

const $ = require('jquery');
const html = require('./index.html').toString();
const css = require('./index.scss').toString();

class Header extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({
            mode: 'open',
        });
        shadow.innerHTML = '<style>' + css + '</style>' + html;
        $(shadow).find('#open-menu-btn')[0].addEventListener('click', () => {
            const open = $(shadow).find('header')
                .hasClass('header__mobile-menu--active');
            if (open) {
                $(shadow).find('header')
                    .removeClass('header__mobile-menu--active').end()
                    .find('#open-menu-btn')
                    .removeClass('header-nav-mobile__menu-button-wrapper--active').end()
                    .find('.header-nav-mobile__menu')
                    .removeClass('header-nav-mobile__menu--active').end();
            } else {
                $(shadow).find('header')
                    .addClass('header__mobile-menu--active').end()
                    .find('#open-menu-btn')
                    .addClass('header-nav-mobile__menu-button-wrapper--active').end()
                    .find('.header-nav-mobile__menu')
                    .addClass('header-nav-mobile__menu--active').end();
            }
        });
        this.shadow = shadow;
    }

    setLoggedIn(loggedIn) {
        $(this.shadow).find('[href="/app"]')
            .text(loggedIn ? 'Go to app' : 'Sign in');
    }
}

window.customElements.define('site-header', Header);

module.exports = Header;