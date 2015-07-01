Server-Error-Pages
==================

Easy to use, professional error pages to replace the plaintext error pages that come with any server software like Nginx or Apache.

**Quick Details**
* Unbranded and generic informational text for the user
* Single HTML files, no directory structure required
* Javascript to get the current domain and for optional LUA variables
* Based on Bootstrap 3
* Uses Bootstrap CDN from NetDNA
* Uses Fontawesome CDN from NetDNA
* HTML5 Validated
* Isup.me integration on network error pages (502 & 504) for the user to check if the error is just for them
* Minimal javascript, no jquery no bootstrap javascript.
* Template for easy edit, and script for create templates
* NGINX quick start config

**Error Pages Included**
* 403 (Forbidden)
* 404 (Not found)
* 429 (Rate limit)
* 494 (Request headers to large)
* 495 (SSL/TLS Certiticate error)
* 496 (SSL/TLS Certiticate error)
* 500 (Internal Server Error)
* 501 (Not Implemented)
* 502 (Bad Gateway)
* 503 (Service Unavailable)
* 504 (Gateway timed out)
* Maintenance

**NGINX**
* Take a look at config-rendered/nginx-error.conf

**Getting started**
* Clone
* Copy error-pages-rendered to your server

**Advanced usage**
* clone
* npm install
* Edit pages.json
* node render.js all
