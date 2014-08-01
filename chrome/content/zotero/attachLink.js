/*
    ***** BEGIN LICENSE BLOCK *****
    
    Copyright © 2014 Center for History and New Media
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

var Zotero_AttachLink = new function() {
	this.onLoad = onLoad;
	this.submit = submit;
	this.cancel = cancel;

	function onLoad() {
	}
	
	function submit () {
		
		var link = document.getElementById('zotero-attach-uri-input').value;
		var title = document.getElementById('zotero-attach-uri-title').value;
		var stringsBundle = document.getElementById("string-bundle");
		var message = document.getElementById('zotero-attach-uri-message');
		var itemID = window.arguments[0].itemID;
		var linkFileMessage = window.arguments[1].linkFileMessage;
		var cleanURI = Zotero.Attachments.cleanAttachmentURI(link);

		if (!cleanURI) {
			message.textContent = stringsBundle.getString('pane.items.attach.link.uri.unrecognized');
			window.sizeToContent();
			window.centerWindowOnScreen();
			document.getElementById('zotero-attach-uri-input').select();
			return false;
		}
		// Don't allow "file:" links, because using "Attach link to file" is the right way
		else if (cleanURI.toLowerCase().indexOf('file:') == 0) {
			message.textContent = stringsBundle.getString('pane.items.attach.link.uri.file') + " \"" + linkFileMessage + "\"";
			window.sizeToContent();
			window.centerWindowOnScreen();
			document.getElementById('zotero-attach-uri-input').select();
			return false;
		}
		else {
			window.arguments[0].out = {link:document.getElementById('zotero-attach-uri-input').value,
			title:document.getElementById('zotero-attach-uri-title').value};
			return true;
		}
	}

	function cancel() {
	}
}