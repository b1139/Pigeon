// deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
        // request a new file system object then pass that to the gotFS() method.
        // gotFS() is a simple setter for a global var that the FileIO methods will use later.
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, FileIO.gotFS, FileIO.errorHandler);
    }
	
	$(".fa-file-image-o").on('click', function() {
getPhoto(pictureSource.PHOTOLIBRARY);
});
 
function getPhoto(source) { 
    // Retrieve image file location from specified source
	alert('get Photo');
    navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
                                destinationType: destinationType.FILE_URI,
                                saveToPhotoAlbum: false,
                                sourceType: source,
                                allowEdit: true });
}
 
// Called when a photo is successfully retrieved
function onPhotoURISuccess(imageURI) {
    FileIO.updateCameraImages(imageURI);
}
 
// Called if something bad happens.
function onFail(message) {
    console.log('Failed because: ' + message);
}

// set some globals
var gImageURI = '';
var gFileSystem = {};
 
var FileIO = {
 
// sets the filesystem to the global var gFileSystem
 gotFS : function(fileSystem) {
      gFileSystem = fileSystem;
 },
 
// pickup the URI from the Camera edit and assign it to the global var gImageURI
// create a filesystem object called a 'file entry' based on the image URI
// pass that file entry over to gotImageURI()
updateCameraImages : function(imageURI) {
        gImageURI = imageURI;
        window.resolveLocalFileSystemURI(imageURI, FileIO.gotImageURI, FileIO.errorHandler);
    },
 
// pickup the file entry, rename it, and move the file to the app's root directory.
// on success run the movedImageSuccess() method
 gotImageURI : function(fileEntry) {
       var newName = "thumbnail_" + gCurrentFlo + ".jpg";
       fileEntry.moveTo(gFileSystem.root, newName, FileIO.movedImageSuccess, FileIO.errorHandler);
 },
 
// send the full URI of the moved image to the updateImageSrc() method which does some DOM manipulation
 movedImageSuccess : function(fileEntry) {
      updateImageSrc(fileEntry.fullPath);
 },
 
// get a new file entry for the moved image when the user hits the delete button
// pass the file entry to removeFile()
 removeDeletedImage : function(imageURI){
      window.resolveLocalFileSystemURI(imageURI, FileIO.removeFile, FileIO.errorHandler);
 },
 
// delete the file
 removeFile : function(fileEntry){
      fileEntry.remove();
 },
 
// simple error handler
 errorHandler : function(e) {
       var msg = '';
       switch (e.code) {
       case FileError.QUOTA_EXCEEDED_ERR:
               msg = 'QUOTA_EXCEEDED_ERR';
               break;
        case FileError.NOT_FOUND_ERR:
               msg = 'NOT_FOUND_ERR';
               break;
        case FileError.SECURITY_ERR:
               msg = 'SECURITY_ERR';
               break;
        case FileError.INVALID_MODIFICATION_ERR:
               msg = 'INVALID_MODIFICATION_ERR';
               break;
        case FileError.INVALID_STATE_ERR:
               msg = 'INVALID_STATE_ERR';
               break;
        default:
               msg = e.code;
        break;
 };
       console.log('Error: ' + msg);
 }
}