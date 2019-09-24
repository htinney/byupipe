import QtQuick 2.7
import Painter 1.0

PainterPlugin {

  AssetList {
    id: importWindow
  }

  AssetList {
    id: publishWindow
  }

  AssetList {
    id: saveWindow
  }

  AssetList {
    id: loadWindow
  }

  Component.onCompleted: {
    // alg.log.info(Qt.application.arguments[1])
    var mediaDir = Qt.application.arguments[1]
    var iconDir = mediaDir + "/pipe/tools/_resources/"
    var assetDir = mediaDir + "/production/assets/"

    var assetXml = mediaDir + "/production/props_and_actors.xml"

    importWindow.xmlFile = assetXml
    publishWindow.xmlFile = assetXml
    saveWindow.xmlFile = assetXml
    loadWindow.xmlFile = assetXml

    // possible alg.ui methods: addDockWidget, addToolBarWidget, addWidgetToPluginToolBar, clickButton
    var importTool = alg.ui.addToolBarWidget("toolbar.qml")
    importTool.windowReference = importWindow
    importTool.windowReference.action = "import"
    importTool.windowReference.mediaDir = mediaDir
    importTool.windowReference.windowTitle = "Choose an asset to import"
    importTool.toolImage = iconDir + "clone.png"
    importTool.tooltipMessage = "Bring in an asset to paint"

    var publishTool = alg.ui.addToolBarWidget("toolbar.qml")
    publishTool.windowReference = publishWindow
    publishTool.windowReference.action = "export"
    publishTool.windowReference.mediaDir = mediaDir
    publishTool.windowReference.windowTitle = "Choose an asset to export maps to"
    publishTool.toolImage = iconDir + "publish.svg"
    publishTool.tooltipMessage = "Export maps to asset"

    var saveTool = alg.ui.addToolBarWidget("toolbar.qml")
    saveTool.windowReference = saveWindow
    saveTool.windowReference.action = "save"
    saveTool.windowReference.mediaDir = mediaDir
    saveTool.windowReference.windowTitle = "Choose an asset to save to"
    saveTool.toolImage = iconDir + "auto-comp.svg"
    saveTool.tooltipMessage = "Save current project"

    var loadTool = alg.ui.addToolBarWidget("toolbar.qml")
    loadTool.windowReference = loadWindow
    loadTool.windowReference.action = "load"
    loadTool.windowReference.mediaDir = mediaDir
    loadTool.windowReference.windowTitle = "Choose an asset to load"
    loadTool.toolImage = iconDir + "checkout.svg"
    loadTool.tooltipMessage = "Load a project"
  }
}