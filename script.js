const fileselector=document.querySelector('input');
const start=document.querySelector('button');
const img=document.querySelector('img');
const progress=document.querySelector('.progress');
const textarea=document.querySelector('textarea');

fileselector.onchange =()=>{
    var file=fileselector.files[0];
    var imgurl=window.URL.createObjectURL(new Blob([file],{type:'image/jpg'}))
    console.log(imgurl);
    img.src=imgurl
}

start.onclick =()=>{
    textarea.innerHTML =' ';
    const rec=new Tesseract.TesseractWorker();
    rec.recognize(fileselector.files[0])
      .progress(function (response){
        if(response.status == 'recognizing text'){
            progress.innerHTML = response.status + '  ' + response.progress;
        }else{
            progress.innerHTML = response.status
        }
      })
      .then(function(data){
        textarea.innerHTML = data.text;
        progress.innerHTML = 'Done';
      })
}