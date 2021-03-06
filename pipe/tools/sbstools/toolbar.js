// toolbar.js
.pragma library

var filePrefix = "file://"
var pathToAssets = "/production/assets/"
var pathToProject = "/texture/main/"
var pathToCache = pathToProject + "cache/"
var fbxPostfix = "_texture_main.fbx"
var savePostfix = "_project.spp"
var saveBackupPostfix = "_backup.spp"
var fileExtenLen = 4

// Documentation for substance painter's 'alg' functions:
// file:///opt/Allegorithmic/Substance_Painter/resources/javascript-doc/alg.html

function save(assetName, mediaDir) {
  alg.log.info("saving " + assetName)
  var filePath = filePrefix + mediaDir + pathToAssets + assetName + pathToProject + assetName + savePostfix
  alg.log.info(filePath)

  alg.project.save(filePath, alg.project.SaveMode.Incremental)
}

function load(assetName, mediaDir) {
  alg.log.info("loading " + assetName)
  var filePath = filePrefix + mediaDir + pathToAssets + assetName + pathToProject + assetName + savePostfix
  alg.log.info(filePath)
  customSaveAndClose(mediaDir)

  alg.project.open(filePath)
}

function importFile(assetName, mediaDir) {
  alg.log.info("importing " + assetName)
  var fbxPath = filePrefix + mediaDir + pathToAssets + assetName + pathToCache + assetName + fbxPostfix
  customSaveAndClose(mediaDir)

  alg.project.create(fbxPath)
}

function exportMaps(assetName, mediaDir) {
  alg.log.info("opening dialogue to export " + assetName)
  var exportPath = mediaDir + pathToAssets + assetName + pathToCache

  alg.mapexport.showExportDialog({format:"png", path:exportPath})
}

// Helper function for saving a backup file and then closing
function customSaveAndClose(mediaDir) {
  alg.log.info("customSaveAndClose")
  // Break early if nothing needs to be saved
  if (!alg.project.isOpen()) {
    alg.log.info("no project opened--skipping save step")
    return
  }

  // Check if the "default" project is still open. if so, close it. The media dir is passed in
  // as an arg at sbs painter startup. Normally a projectDir file would be passed
  // in so the last part of the media directory path becomes the default project name.
  if (alg.project.name() === mediaDir.split("/").pop() ) {
    alg.log.info("closing default project")
    alg.project.close()
  }
  // Save an already opened file
  else {
    alg.log.info("saving and closing current project")
    var assetName = getAssetName()
    var filePath = filePrefix + mediaDir + pathToAssets + assetName + pathToProject + assetName + saveBackupPostfix

    alg.project.save(filePath, alg.project.SaveMode.Incremental)
    alg.project.close()
  }
}

// Get the name of the asset currently being worked on
function getAssetName() {
  var projName = alg.project.name()
  // e.g "myAsset_project".length - ("_project.spp".length - 4) = 7
  return projName.slice(0, projName.length - (savePostfix.length - fileExtenLen))
}

function isValidProject(mediaDir) {
  if (!alg.project.isOpen()) {
    return false
  } else if (alg.project.name() === mediaDir.split("/").pop() ) {
      return false
  } else if (alg.project.name() === "Untitled" ) {
      return false
  }
  // else
  return true
}
