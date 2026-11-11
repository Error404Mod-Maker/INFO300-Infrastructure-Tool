INFO 300 - Infrastructure Decision Tool

This is a Node.js program with two options: a subnet host checker and a compute environment selector.

How to run:
1. Open a terminal in the folder with app.js.
2. Run npm install (or npm.cmd install in PowerShell).
3. Run node app.js.
4. Choose option 1 or 2. You can run the program again or exit.

Subnet example 1 (enough addresses):
VPC CIDR: /16
Subnet CIDR: /24
Devices: 100
There are 251 usable IP addresses after AWS reserves 5, so 151 are unused.

Subnet example 2 (not enough addresses):
VPC CIDR: /16
Subnet CIDR: /28
Devices: 20
There are 11 usable IP addresses after AWS reserves 5, so 9 more are needed.

The compute selector uses monthly users and high availability to recommend EC2, a load balancer, or Auto Scaling. It also displays budget warnings when applicable.
