# README 
## Overall process you went through, any key decisions made.
##### I broke down the process as thus:**
	1. Used JS YahooFinance API to pull out stock information quotes (30 min)
	2. Made the ATM balance to allow for money withdrawal and deposits (45 min)
	3. Linked stock purchases to the cash withdrawals (20 min)
	4. Saved balance and stock purchases to localStorage under var string upon window close and stock purchase event (2 hr)
	5. Visualsed stock purchases by rendering each on the page (2 hr)
	6. Testing features (N/A)
	7. CSS editing / visual design (30 min)

## Shortcuts, simplifying assumptions, known bugs, etc.
##### Buying the stocks depends on the logic within the DOM, rather than pulling out the saved quote_output data from YahooFinance api 
##### Only currency under consideration is the $ - does not alter for currencies 
##### If the stock does not exist, the stock information is still rendered on the page -- although you cannot conduct the transaction to buy the stock, the stock information still appears on the page 
##### Need to move more logic out of the DOM - would have liked to start using rendering libraries such as handlebars.js 

## What slowed you down, what was unexpected
##### Having to reconstruct some of my structure when I realised that I needed to have all stock purchases re-rendered on the page upon window close and open from localStorage 
##### Not using a library like handlebars.js meant that a lot of time was spend appending DOM elements manually - should have used handlebars library from the start to save time on page rendering and aesthetic design 

## Any problems you ran into, and how you solved them
##### Setting up the listeners on each transaction i.e. listening for the click of the sellButton and the input number of stocks. 
	###### Achieved using closures that would be set on each transaction rather than waiting for a click on a sellStock and bubbling up to find that stock information from the DOM 
	###### Setting up the listener for "click sell" button needed to be done as a callback inside the YahooFinance function call. This is because it would require information about stock current_price, and would need to wait on the particular instance of the click of a sellButton 
