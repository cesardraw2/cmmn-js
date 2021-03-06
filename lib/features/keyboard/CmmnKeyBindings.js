'use strict';

function CmmnKeyBindings(
    canvas,
    directEditing,
    editorActions,
    elementRegistry,
    globalConnect,
    handTool,
    keyboard,
    lassoTool,
    selection,
    searchPad,
    spaceTool
) {

  var actions = {
    selectElements: function() {
      // select all elements except for the invisible
      // root element
      var rootElement = canvas.getRootElement();

      var elements = elementRegistry.filter(function(element) {
        return element != rootElement;
      });

      selection.select(elements);
    },
    spaceTool: function() {
      spaceTool.toggle();
    },
    lassoTool: function() {
      lassoTool.toggle();
    },
    handTool: function() {
      handTool.toggle();
    },
    globalConnectTool: function() {
      globalConnect.toggle();
    },
    directEditing: function() {
      var currentSelection = selection.get();

      if (currentSelection.length) {
        directEditing.activate(currentSelection[0]);
      }
    },
    find: function() {
      searchPad.toggle();
    }
  };

  editorActions.register(actions);

  keyboard.addListener(function(key, modifiers) {

    // ctrl + a -> select all elements
    if (key === 65 && keyboard.isCmd(modifiers)) {
      editorActions.trigger('selectElements');

      return true;
    }

    // ctrl + f -> search labels
    if (key === 70 && keyboard.isCmd(modifiers)) {
      editorActions.trigger('find');

      return true;
    }

    if (keyboard.hasModifier(modifiers)) {
      return;
    }

    // s -> activate space tool
    if (key === 83) {
      editorActions.trigger('spaceTool');

      return true;
    }

    // l -> activate lasso tool
    if (key === 76) {
      editorActions.trigger('lassoTool');

      return true;
    }

    // h -> activate hand tool
    if (key === 72) {
      editorActions.trigger('handTool');

      return true;
    }

    // c -> activate global connect tool
    if (key === 67) {
      editorActions.trigger('globalConnectTool');

      return true;
    }

    // e -> activate direct editing
    if (key === 69) {
      editorActions.trigger('directEditing');

      return true;
    }
  });
}

CmmnKeyBindings.$inject = [
  'canvas',
  'directEditing',
  'editorActions',
  'elementRegistry',
  'globalConnect',
  'handTool',
  'keyboard',
  'lassoTool',
  'selection',
  'searchPad',
  'spaceTool'
];

module.exports = CmmnKeyBindings;
