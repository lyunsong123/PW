var imageLoader = document.getElementById('imageLoader');
imageLoader.addEventListener('change', handleImage, false);
var canvas = document.getElementById('imageCanvas');
var ctx = canvas.getContext('2d');
var messageInput = document.getElementById('message');

var textCanvas = document.getElementById('textCanvas');
var tctx = textCanvas.getContext('2d');

//handle decoding
var decodeCanvas = document.getElementById('imageCanvas2');
var dctx = decodeCanvas.getContext('2d');
var imageLoader2 = document.getElementById('imageLoader2');
imageLoader2.addEventListener('change', handleImage2, false);

function handleImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            canvas.width = img.width;
            canvas.height = img.height;
            textCanvas.width=img.width;
            textCanvas.height=img.height;
            tctx.font = "30px Arial";
            var messageText = 'hi garfield';
            tctx.fillText(messageText,10,50);
            ctx.drawImage(img,0,0);
            var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            var textData = tctx.getImageData(0, 0, canvas.width, canvas.height);
            var pixelsInMsg = 0;
            pixelsOutMsg = 0;
            for (var i = 0; i < textData.data.length; i += 4) {
                if (textData.data[i+3] !== 0) {
                    if (imgData.data[i+1]%10 == 7) {
                        //do nothing, we're good
                    }
                    else if (imgData.data[i+1] > 247) {
                        imgData.data[i+1] = 247;
                    }
                    else {
                        while (imgData.data[i+1] % 10 != 7) {
                            imgData.data[i+1]++;
                        }
                    }
                    pixelsInMsg++;
                }
                else {
                    if (imgData.data[i+1]%10 == 7) {
                        imgData.data[i+1]--;
                    }
                    pixelsOutMsg++;
                }
            }
            console.log('pixels within message borders: '+pixelsInMsg);
            console.log('pixels outside of message borders: '+pixelsOutMsg);
            ctx.putImageData(imgData, 0, 0);
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
}
