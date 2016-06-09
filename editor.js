(function($) {

	$.fn.editor = function( options ) {

		var defaults = {
			buttons: {

			}
		};

		var settings = $.extend({}, defaults, options);

		var defaultButtons  = {
			'bold': {
				buttonDisplay: 'B',
				code: '[b]{SELTEXT}[/b]'
			},
			'italic': {
				buttonDisplay: 'i',
				code: '[i]{SELTEXT}[/i]'
			},
			'underline': {
				buttonDisplay: '<u>U</u>',
				code: '[u]{SELTEXT}[/u]'
			},
			'strikethrough': {
				buttonDisplay: '<span style="text-decoration:line-through;">S</span>',
				code: '[s]{SELTEXT[/s]'
			},
			'link': {
				buttonDisplay: 'URL',
				code: '[url={SELTEXT}]{SELTEXT}[/url]'
			},
			'image': {
				buttonDisplay: 'IMG',
				code: '[img]{SELTEXT}[/img]'
			}
		};

		$(document).on('click', 'a[data-editor-action="button"]', function() {
			var parentEditor = $(this).attr('data-editor-parent');
				//console.log($(this).attr('title'));
				//var relatedTextarea = $(this).parent().parent().find('[data-editor-name="' + editorName + '"]');
				var relatedTextarea = $('[data-editor-name="' + parentEditor + '"]');
				//Finding selection region.
				var len             = relatedTextarea.val().length;
				var start           = relatedTextarea[0].selectionStart;
				var end             = relatedTextarea[0].selectionEnd;
				var selectedText    = relatedTextarea.val().substr(start, end);
				console.log(len);

				//Replacing.
				var buttonClicked   = $(this).attr('data-editor-button');
				//var codeReplace     = defaultButtons[buttonClicked].code.split('{SELTEXT}');
				//var replacement     = codeReplace[0] + selectedText + codeReplace[1];
				var replacement = defaultButtons[buttonClicked].code.replace(/{SELTEXT}/g, selectedText);

				//Put the values in the textarea.
				relatedTextarea.val(relatedTextarea.val().substring(0, start) + replacement + relatedTextarea.val().substring(end, len));
			});

		//Rendering the editor.
		return this.each(function() {

			//Getting the name.
			var name = $(this).attr('name');
			var textarea = $(this).get(0).outerHTML;
			var editorName = $(this).attr('data-editor-name');

			var buttons = '';
			$.each(defaultButtons, function(index, value) {
				buttons += '<a title="' + index + '" data-editor-action="button" data-editor-button="' + index + '" data-editor-parent="' + editorName + '">' + value.buttonDisplay + '</a>';
			});

			//Putting the textarea into a wrapper.
			$(this).before('<div class="editor_wrapper" data-editor-child="'  + editorName +  '"><div class="button_wrapper">' + buttons + '</div>' + textarea + '</div>');

			//Removing the original textarea.
			$(this).remove();

			//Events
		});
	};

}( jQuery ))