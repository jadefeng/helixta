# require 'pry'
# Find if there is a loop in a linked list

# Creating a linked list
class LinkedList 
	attr_accessor :val, :next

	def initialize(val_, next_)
		@val = val_
		@next = next_
	end

end

ll4 = LinkedList.new(4, nil)
ll3 = LinkedList.new(3, ll4)
ll2 = LinkedList.new(2, ll3)
ll1 = LinkedList.new(1, ll2)

# Testing for loops

def findLoop(llist)
	linked_list_map = {}
	linked_list = llist

	until linked_list.next == nil
		if linked_list_map[linked_list] == true 		# search through linked_list_map that linked_list exists as a key
			return true 								# We found a loop! 
		else											# If there is no loop in this node of a linked list (yet)
			linked_list_map[linked_list] = true 		# Add the linkedlist to the map, with the key being the linkedlist and the value being true
			linked_list = linked_list.next 				# Updated the linked_list value for the next iteration
		end
	end
	return false 										# There is no loop in this entire linked list!
end

puts findLoop(ll1)  	# => false 

puts "Creating a loop"
ll4.next = ll1
puts findLoop(ll1)		# => true

# binding.pry
