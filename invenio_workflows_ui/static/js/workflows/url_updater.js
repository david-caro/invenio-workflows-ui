/*
 * This file is part of Invenio.
 * Copyright (C) 2015, 2016 CERN.
 *
 * Invenio is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation; either version 2 of the
 * License, or (at your option) any later version.
 *
 * Invenio is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Invenio; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place, Suite 330, Boston, MA 02111-1307, USA.
 */


define(
  [
    'jquery',
    'flight'
  ],
  function(
    $,
    flight) {

    "use strict";

    return flight.component(WorkflowsUIUrlUpdater);

    function WorkflowsUIUrlUpdater() {

      this.attributes({
        urlPrefix: ""
      });

      this.updateUrlFromTags = function(ev, data) {
        // Different states depending on the value
        switch(data.search.length) {
          case 0:
            // history API accepts UNIX-like relative paths
            this.replaceHistoryUrl('.');
            break;
          default:
            this.replaceHistoryUrl(this.attr.urlPrefix + data.search);
            break;
        }
      };

      this.replaceHistoryUrl = function(url_state) {
        history.replaceState({}, '', url_state);
      };

      this.after('initialize', function() {
        this.on(document, "update_url", this.updateUrlFromTags);
        $(document).trigger("updateTags");
        console.log("Url Updater init");
      });
    }
  });
