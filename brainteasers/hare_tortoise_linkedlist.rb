# Using the Hare and Tortoise algorithm
# Inspiration from http://codingfreak.blogspot.com/2012/09/detecting-loop-in-singly-linked-list_22.html

# require 'pry'

# Creating a linked list
class LinkedList 
	attr_accessor :val, :next

	def initialize(val_, next_)
		@val = val_
		@next = next_
	end

end

ll5 = LinkedList.new(5, nil)
ll4 = LinkedList.new(4, ll5)
ll3 = LinkedList.new(3, ll4)
ll2 = LinkedList.new(2, ll3)
ll1 = LinkedList.new(1, ll2)

# Using the hare and tortoise algo 

def HareAndTortoiseLoop(llist)
	tortoise = llist  
	hare = llist  
	  
	while true
		(0..1).to_a.each do |time|	# Repeat this code twice to push the hare 2 spaces ahead of the tortoise
			if hare.next == nil   
		    	return false  
			end		
		  	hare = hare.next  
	  	end  

	  	tortoise = tortoise.next  
	  
	  	if hare == tortoise  
	    	return true
		end
	end
end


puts HareAndTortoiseLoop(ll1)  	# => false 

puts "Creating a loop"
ll4.next = ll1
puts HareAndTortoiseLoop(ll1)		# => true