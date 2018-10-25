
var extension = new window.RemixExtension();
var compileMsg = "Compiling smart contract, please wait...";

async function do_post(url, data, cb) {
  var baseUrl = "http://52.14.164.58/" + url
  try{
    const response =  await (await fetch(baseUrl,{ method: 'POST', headers: { "Content-Type": "application/json; charset=utf-8"},body: JSON.stringify(data)})).json();

    cb(response);

  }
  catch (error) {
    console.log(error);
  }
 
}

function handleCompileSuccess(result,analysisType) {
  if(result[0] === null){
     document.querySelector('div#results').innerHTML = `No compile results found for this contract, please make sure <br> the contract compiles correctly.`;
     return;
  }
  document.querySelector('div#results').innerHTML = `Doing ${analysisType} analysis. Please wait...`;
  // fetch results
  do_post(`/analysis/${analysisType}`, result, function(res) {

        document.querySelector('div#results').innerHTML = res['output'];
    
  });
   

}

function handleCompileFailure(error,analysisType) {
  document.querySelector('div#results').innerHTML = error;
}

window.onload = function() {
  console.log("LOADED ANALYSIS PLUGIN");
  extension.listen('compiler', 'compilationFinished', function (result) {
    console.log("GOT A COMPILE: ");
    console.log(result);
  });


  document.querySelector('input#mythril').addEventListener('click', function () {
    var div = document.querySelector('div#results');
    div.innerHTML = compileMsg;
    extension.call('compiler', 'getCompilationResult', [],function (error, result ) {
        if(result) {
          handleCompileSuccess(result,'mythril');
        }
        else{
          handleCompileFailure(error,'mythril');
        }
    });
  });

  document.querySelector('input#slither').addEventListener('click', function () {
    var div = document.querySelector('div#results');
    div.innerHTML = compileMsg;
    extension.call('compiler', 'getCompilationResult', [], function (error, result ) {
        if(result) {
          handleCompileSuccess(result,'slither');
        }
        else{
          handleCompileFailure(error,'slither');
        }

    });
  });

}
