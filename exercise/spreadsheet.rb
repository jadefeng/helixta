require 'pry'
require 'csv'    

fileName = ARGV[0]

@cellFile = CSV.read( fileName )
CSV.foreach( fileName ) do |row|
  puts row.inspect
end

@alphabet_array = ("a".."z").to_a

def convert(cellKey)
	row = cellKey.split().map {|x| x[/\d+/]}  	# Finding numbers
	row_index = row[0].to_i - 1

	column = cellKey.split().map {|x| x[/([a-z]+)/]} 	# Finding letters
	column_index = @alphabet_array.index(column[0])

	# Find the value in the right column / row and use calculate!
	element =  @cellFile[row_index][column_index] 

	calculation( element.strip )

end

def calculation(cellInput)
	## Convert the CSV line into a string, seperated by spaces
	cellInput_Array = cellInput.split(" ")
	operands = []
	results = []

	cellInput_Array.each do |input|
		# input = input.strip
		if (input == '+' || input == '-' || input == '/' || input == '*')
			if results.length > 1
				operands = results.pop(2)
				solution = operands[0].send(input, operands[1])
				results.push(solution)
			else
				return "#ERR"
			end
		elsif (input !~ /\D/ )
			results.push( input.to_i )
		else
			results.push( convert(input) ) 

		end
	end

	if results.length == 0
		return 0
	elsif results.length != 1
		return "#ERR"
	else
		return results[0]
	end

end

x = @cellFile.length
y = @cellFile[0].length

output = []
for x in 0...@cellFile.length 
	for y in 0...@cellFile[0].length 
		output << calculation( @cellFile[x][y] )
	end
	puts output.join(",")
	output = []
end