rails new backendStocks -database=postgres

rails generate scaffold User username password_digest email balance

rails generate scaffold Purchase user_id stock_symbol stock_name purchase_price units


Purchase 
	belongs_to user

User 
	has_many purchases

