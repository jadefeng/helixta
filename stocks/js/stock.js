'use strict'

// Stock portfolio balance account
var account = {
    balance: 0,
    purchases: {},
    purchaseCount: 0
};

// Render purchases on page
function yahooFinance(symbol, callback) {
    var url = "http://query.yahooapis.com/v1/public/yql";
    var data = encodeURIComponent("select * from yahoo.finance.quotes where symbol in ('" + symbol + "')");
    $.getJSON(url, 'q=' + data + "&format=json&diagnostics=true&env=http://datatables.org/alltables.env")
        .done(function (data) {
            // data.query.results.quote.LastTradePriceOnly*= 1 
            // data.query.results.quote.LastTradePriceOnly+= Math.random()
            callback(data.query.results.quote);
        }).fail(function (jqxhr, textStatus, error) {
            console.error("The request failed.")
            $("#stock_info").text('Request failed: ' + err);
            callback(null);
        });
};  




$(document).ready(function() {
    function renderPurchase( purchaseKey) {

        var stockPurchase = account.purchases[purchaseKey]
        // function appendTable() {
            var row = $('<tr></tr>')
            var nameCell = $('<td></td>')
            var unitsCell = $('<td></td>')
            var purchasePriceCell = $('<td></td>')
            var currentPriceCell = $('<td></td>')
            var sellCell = $('<td></td>')
            var sellButton = $('<button>Sell</button>')
            var symbol = stockPurchase.symbol
            nameCell.text(stockPurchase.name)
            unitsCell.text(stockPurchase.units)
            purchasePriceCell.text(stockPurchase.purchase_price)
            currentPriceCell.text(stockPurchase.purchase_price)            
            sellCell.append(sellButton)
                
            row.append(nameCell).append(unitsCell).append(purchasePriceCell).append(currentPriceCell).append(sellCell);

            $('table').append(row)
        // }
        // appendTable()

        // Update Price
        function updatePrice() {
            yahooFinance(symbol, stockInformationUpdate )

            function stockInformationUpdate(quote_output) {
                var current_price = quote_output.LastTradePriceOnly;
                currentPriceCell.text(current_price)

                console.log("just found the latest price!");
            }
            // debugger;
        }

        var updatingPriceInterval = setInterval( updatePrice , 5000)

        yahooFinance(
            symbol,
            function(quote)
            {
                var current_price = quote.LastTradePriceOnly;
                sellButton.click( function() {
                    var moneyFromStock = stockPurchase.units * current_price;
                    deposit(moneyFromStock);
                    clearInterval( updatingPriceInterval );

                    row.remove();

                    delete account.purchases[purchaseKey];

                    console.log('deleted')
                    console.log(account)

                })
            })
    }    



    if (localStorage.getItem("account") !== null) {
        account = JSON.parse(localStorage.getItem('account'))

        // Rendering all purchases on window load
        for (var purchase_key in account.purchases) {
            // debugger;
            renderPurchase( purchase_key )
        }
    }

    $(window).unload( function() {
        localStorage.setItem('account', JSON.stringify(account))
    })

    var deposit = function (amount) {
        if (amount > 0) {
            account.balance += amount;
            ATM.update()
        }
    }

    var withdraw = function (amount) {
        if (amount <= account.balance && amount > 0) {
            account.balance -= amount;
            ATM.update()
        } 
    }        


    // Finding the stock ticker price and details
    $('#search').on('click', getStock);
    $('.stock_tables').on('click', '#buy_button', buyStocks);
  

    function getStock() {
        var symbol = $("#stock_ticker").val();

        yahooFinance(symbol, stockInformation )

        
        function stockInformation(quote_output) {
            var symbol = '<h2 class="quote_symbol">' + quote_output.Symbol + '</h2>';
            var name = '<h2 class="quote_name">' + quote_output.Name + '</h2>';
            var price = '<h3 class="quote_price">' + quote_output.LastTradePriceOnly + '</h3>';
            var num_stocks = '<input type="number" id="num_stocks">';
            var buy_button = '<button id="buy_button"> Buy Stock! </button>';

            $("#stock_info").html(symbol + name + price + num_stocks + buy_button);
            console.log(quote_output);
        }
            

        $("#stock_ticker").val("");
    };

    // Getting the balance working for money to go in and out
    var ATM = {
        ui: {
            $Deposit: $('#Deposit'),
            $Withdraw: $('#Withdraw'),
            $Amount: $('#Amount'),
            $Balance: $('#balance'),
            $Account: $('#Account'),          
        },

        update : function() {
            ATM.ui.$Balance.text("$" + account.balance);
            ATM.ui.$Amount.val('');
        }
    };
    ATM.update(); // Call this on page load

    ATM.ui.$Deposit.on('click',function(){
        var amount = parseInt(ATM.ui.$Amount.val());
        deposit(amount);
        ATM.update();
    });

    ATM.ui.$Withdraw.on('click',function(){
        var amount = parseInt(ATM.ui.$Amount.val());
        withdraw(amount);
        ATM.update();
    }); 



    // Buying a stock

    function buyStocks() {
        console.log("Hello lets buy a stock");
        var name = $('.quote_name').text();
        var purchase_price = $('.quote_price').text();
        var symbol = $('.quote_symbol').text();
        var current_price = purchase_price;
        console.log(name, purchase_price);

        // TODO -- add the stock ID into an array
        var units = $('#num_stocks').val();

        var transaction = parseInt(units) * parseFloat(purchase_price);
        console.log(transaction);


        if ( account.balance >= transaction ) {
            account.purchaseCount += 1
            var purchaseKey = account.purchaseCount
            var purchase = { symbol: symbol, name: name, units: units, purchase_price: purchase_price  }
            // Putting the new purchase into the account in the localStorage, with a purchaseCount as the key and the purchase as the values
            account.purchases[purchaseKey] = purchase 
            renderPurchase(purchaseKey)

            withdraw(transaction);
            ATM.update();


            // var row = $('<tr></tr>')
            // var nameCell = $('<td></td>')
            // var unitsCell = $('<td></td>')
            // var purchasePriceCell = $('<td></td>')
            // var currentPriceCell = $('<td></td>')
            // var sellCell = $('<td></td>')
            // var sellButton = $('<button>Sell</button>')

            // nameCell.text(name)
            // unitsCell.text(units)
            // purchasePriceCell.text(purchase_price)
            // currentPriceCell.text(current_price)            
            // sellCell.append(sellButton)
            
            // row.append(nameCell).append(unitsCell).append(purchasePriceCell).append(currentPriceCell).append(sellCell);

            // console.log(row);
            // $('table').append(row);



        } else {
            alert("Need more money")
        }

    }

    // local storage
    // currency difference ( wish list, will need to incorporate currency realtime )
    // prettify!

    // Can sell some of the stock, not all the stock

    // Average purchase price if you choose to buy the same stock again

});