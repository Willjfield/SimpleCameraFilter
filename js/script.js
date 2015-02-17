'use strict';

/**
 * CONFIGURABLE SETTINGS
 */

/**
 * width of on-screen 'preview' video in pixels
 */
var cameraWidth = 960;

/**
 * height of on-screen 'preview' video in pixels
 */
var cameraHeight = 720;

var frameNum = 0;

var isOn;

/************************************************/

var camera;

var CameraApp = {
    /**
     * Instantiate the Camera object.
     */
    init: function()
    {
        camera = new Camera();
        camera.startCapture(this.onCameraReady.bind(this), this.onCameraError);

        this.start();
        isOn = true;
    },

    /**
     * Set a CLICK event listener on the "start" html element. When it is clicked, call the startCamera function
     */
    start: function()
    {
        $('#start').bind('click', function(){
            CameraApp.startCamera();
            $(this).empty();
            
        });
    },

    /**
     * If the camera is available and ready, create the "monitor" canvas element and its dimensions
     */
    onCameraReady: function() {
        this.monitor = new CanvasImage($('#monitor'), cameraWidth, cameraHeight);
        $('#monitor').css({
            'min-width': cameraWidth,
            'min-height': cameraHeight
        });
    },

    /**
     * If the camera is not available or ready, attempt to re-connect it
     */
    onCameraError: function() {
        if ( this.onCameraReady) {
            camera.startCapture(this.onCameraReady.bind(this), this.onCameraError);
        }
    },

    /**
     * Call the onNewFrame function, but set the camera mode to be ON before making the call
     */
    startCamera: function() {
        this.cameraEnabled = true;
        this.onNewFrame();
    },

    /**
     * Call the onNewFrame function, but set the camera mode to be OFF before making the call
     */
    stopCamera: function() {
        this.cameraEnabled = false;
    },
            
    /**
     * Set the "monitor" html element to receive image data from live camera video and render it
     */
    onNewFrame: function() {
        this.monitor.setImage(camera.video);

                $('#monitor').bind('click', function(){
            isOn = !isOn;
        });

        if (this.cameraEnabled) {
            requestAnimationFrame(this.onNewFrame.bind(this));
            
        if(isOn){
             $('#monitor').css({
                '-webkit-filter':'hue-rotate('+frameNum+'deg)'
            });
         }else{
            $('#monitor').css({
                '-webkit-filter':'hue-rotate()'
            });
         }
            console.log(isOn);
        }
        frameNum++;
    }
};

/*
* When the html document model is loaded and ready, start the CameraApp's init function
*/
$(document).ready(CameraApp.init.bind(CameraApp));
