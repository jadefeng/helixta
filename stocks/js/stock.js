// Stock portfolio balance account
var account = {
    balance: 0,
    deposit: function (amount) {
        if (amount > 0) {
            account.balance += amount;
        }
    },
    withdraw: function (amount) {
        if (amount <= account.balance && amount > 0) {
            account.balance -= amount;
        } 
    }
};

$(document).ready(function() {

    // Finding the stock ticker price and details
    $('#search').on('click', getStock);
    $('.stock_tables').on('click', '#buy_button', buyStocks);

    function yahooFinance(symbol, callback) {
        var url = "http://query.yahooapis.com/v1/public/yql";
        var data = encodeURIComponent("select * from yahoo.finance.quotes where symbol in ('" + symbol + "')");
        $.getJSON(url, 'q=' + data + "&format=json&diagnostics=true&env=http://datatables.org/alltables.env")
            .done(function (data) {
                callback(data.query.results.quote);
            }).fail(function (jqxhr, textStatus, error) {
                callback(null);
                // $("#stock_info").text('Request failed: ' + err);
            });
    };    

    

    function getStock() {
        var symbol = $("#stock_ticker").val();

        yahooFinance(symbol, stockInformation )

        
        function stockInformation(quote_output) {
            // var quote_output = data.query.results.quote;
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
    ATM = {
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

    ATM.ui.$Deposit.on('click',function(){
        var amount = parseInt(ATM.ui.$Amount.val());
        account.deposit(amount);
        ATM.update();
    });

    ATM.ui.$Withdraw.on('click',function(){
        var amount = parseInt(ATM.ui.$Amount.val());
        account.withdraw(amount);
        ATM.update();
    }); 


    // Buying a stock


    function buyStocks() {
        console.log("Hello lets buy a stock");
        var name = $('.quote_name').text();
        var purchase_price = $('.quote_price').text();
        var symbol = $('.quote_symbol').text();
        var current_price;
        console.log(name, purchase_price);

        // TODO -- add the stock ID into an array
        var units = $('#num_stocks').val();

        var transaction = parseInt(units) * parseFloat(purchase_price);
        console.log(transaction);

        account.withdraw(transaction);
        ATM.update();

        // Update Price
        function updatePrice() {
            yahooFinance(symbol, stockInformationUpdate )

            function stockInformationUpdate(quote_output) {
                current_price = '<h3 class="quote_price">' + quote_output.LastTradePriceOnly + '</h3>';
                var html = '<tr> <td>' + name + '</td> <td> ' + units + '</td> <td> $' + purchase_price + '</td> <td>' + current_price  + '</td> <td> Profit/Loss </td> <td> <button class="sell"> Sell! </button> </td></tr> ';
                $('table').html(html);
                console.log("just found the latest price!");
            }
        }


        setInterval( updatePrice ,1000)


        // if (account.balance) { }

    }

    // Update the stock prices using ajax calls every second
    // TODO - work through the stockID array and call through the yahoofinance aPI
    // TODO - update the value in the HTML accordingly


    // Manage a sell stock
        // Event listener on 'sell' button
        // If click on "sell"
        // Finds the stock
        // Finds updated "current price"
        // Adds # * new stock price
        // Removes stock from portfolio

    // $('body').find('.sell').on('click', 
    //     console.log("selling stock")
    // )

    // Need to incorporate local storage -- updates local storage array of stock each time there is a buy or sell 
    // Local storage also works on the $ in my portfolio

});