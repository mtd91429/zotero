/*
    ***** BEGIN LICENSE BLOCK *****
    
    Copyright © 2009 Center for History and New Media
                     George Mason University, Fairfax, Virginia, USA
                     http://zotero.org
    
    This file is part of Zotero.
    
    Zotero is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    
    Zotero is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.
    
    You should have received a copy of the GNU Affero General Public License
    along with Zotero.  If not, see <http://www.gnu.org/licenses/>.
    
    ***** END LICENSE BLOCK *****
*/

var Zotero_attachLink = new function() {
	
	this.onLoad = function() {
		document.getElementById('zotero-attach-uri-input').focus();
	}
	
	this.submit = function() {
		
		var link = document.getElementById('zotero-attach-uri-input').value;
		var title = document.getElementById('zotero-attach-uri-title').value;
		var defaultMessage = document.getElementById('zotero-attach-uri-default-message');
		var fileMessage = document.getElementById('zotero-attach-uri-file-message');
		var unrecognizedMessage = document.getElementById('zotero-attach-uri-unrecognized-message');
		var itemID = window.arguments[0].itemID;
		var cleanURI = Zotero.Attachments.cleanAttachmentURI(link);
		if (!link.trim()) {
				window.close();
			}
		// Don't allow "file:" links, because using "Attach link to file" is the right way
		if (cleanURI.toLowerCase().indexOf('file:') == 0) {
			defaultMessage.setAttribute("hidden", "true");
			fileMessage.setAttribute("hidden", "false");
		}
		else if (!cleanURI) {
			defaultMessage.setAttribute("hidden", "true");
			unrecognizedMessage.setAttribute("hidden", "false");
		}
		else if (cleanURI) {
			Zotero.Attachments.linkFromURL(cleanURI, itemID, null, title);	  
			window.close();
		}
	}
	
	this.cancel = function() {
		window.close();
	}
}