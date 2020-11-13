// Created by: https://github.com/IvRRimum

function waitForElementToDisplay(selector, callback, checkFrequencyInMs, timeoutInMs) {
  var startTimeInMs = Date.now();
  (function loopSearch() {
    if (document.querySelector(selector) != null) {
      callback();
      return;
    }
    else {
      setTimeout(function () {
        if (timeoutInMs && Date.now() - startTimeInMs > timeoutInMs)
          return;
        loopSearch();
      }, checkFrequencyInMs);
    }
  })();
}

window.addEventListener("load", function(){
  if (window.location.href == "https://web.xmrpool.eu/") {
    waitForElementToDisplay("#yourPendingBalance", function(){ 
      $("#yourPendingBalance").parent().append(" | <a id='eurInfoActionBalance' target='_blank' style='cursor: pointer; color: #000; font-weight: bold; text-decoration: underline;'>EUR</a>");
      $("#lastBlockReward").parent().append(" | <a id='eurInfoActionLastBlock' target='_blank' style='cursor: pointer; color: #000; font-weight: bold; text-decoration: underline;'>EUR</a>");
      $("#eurInfoActionBalance").on("click", eurInfoActionBalance);
      $("#eurInfoActionLastBlock").on("click", eurInfoActionLastBlock);
    });
  }
})

function eurInfoActionBalance() {
  waitForElementToDisplay("#yourPendingBalance", function(){ 
    var xmr = parseFloat($("#yourPendingBalance").html());
    window.open('https://www.cryptonator.com/rates/convert/?amount=' + xmr + '&primary=xmr&secondary=eur&source=liverates');
  }, 500, 10000);
}

function eurInfoActionLastBlock() {
  waitForElementToDisplay("#lastBlockReward", function(){ 
    var xmr = parseFloat($("#lastBlockReward").html());
    window.open('https://www.cryptonator.com/rates/convert/?amount=' + xmr + '&primary=xmr&secondary=eur&source=liverates');
  }, 500, 10000);
}
