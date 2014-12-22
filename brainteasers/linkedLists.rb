require 'pry'
# Find if there is a loop in a linked list

# Creating a linked list
class LinkedList 
	attr_accessor :val, :next

	def initialize(val_, next_)
		@val_ = val_
		@next_ = next_
	end

	def next 
		# Method to reference the 'next' method
	end

	def val
		# Method to reference value
	end

end

ll4 = LinkedList.new(3, nil)
ll3 = LinkedList.new(3, ll4)
ll2 = LinkedList.new(2, ll3)
ll1 = LinkedList.new(1, ll2)

# Testing for loops

## TODO - find out how to access .next and .val attributes in a linkedList
def findLoop(llist)
	linked_list_map = {}
	linked_list = llist

	if linked_list.next == nil
		puts "There is no loop in this linked list"
	else
		if linked_list_map[linked_list] == true
			# search through linked_list_map that linked_list exists as a key
			puts "There is a loop in this linked list"
		else	# If it does not exist
			linked_list_map[linked_list] = true 	# Add the linkedlist to the map, with the key being the linkedlist and the value being true
			linked_list = linked_list.next 			# Updated the linked_list value
		end
	end
end

findLoop(ll1)

ll4 = LinkedList.new(3, ll1)
findLoop(ll1)

binding.pry
