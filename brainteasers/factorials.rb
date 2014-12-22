# require 'pry'

# Ex 1 - How many 0s are remaining in the factorial number
def zerosInFactorial(n)
	zero_counter = 0
	index = 0

	until n < 5**index
		index += 1
		zero_counter += (n / (5**index))
	end

	puts "There are #{zero_counter} zero(s) at the end of #{n}!"
end

zerosInFactorial(5) 	# => 1
zerosInFactorial(128)	# => 31

# Ex 2 - How many primes are there?

def findingPrime(n, prime)
	prime_counter = 0
	index = 0

	until n < prime**index
		index += 1 
		prime_counter += (n / (prime**index))
	end

	puts "The #{prime} factor appears #{prime_counter} time(s) in the result of #{n}!"
end

findingPrime(5, 2)		# => 3
findingPrime(128, 5)	# => 31
findingPrime(128, 2)	# => 127
