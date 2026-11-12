var readline = require('readline-sync');

function getNumber(message, min, max) {
    while (true) {
        var answer = readline.question(message).trim();
        var number = Number(answer);
        if (answer !== '' && Number.isInteger(number) && number >= min && (max === undefined || number <= max)) {
            return number;
        }
        console.log('Invalid number. Try again.');
    }
}

function getCidr(message) {
    while (true) {
        var answer = readline.question(message).trim();
        if (answer.charAt(0) === '/') answer = answer.substring(1);
        var number = Number(answer);
        if (answer !== '' && Number.isInteger(number) && number >= 16 && number <= 30) return number;
        console.log('Enter a CIDR between /16 and /30.');
    }
}

function subnetChecker() {
    console.log('\nSubnet Host Checker');
    var vpc = getCidr('VPC CIDR: ');
    var subnet = getCidr('Subnet CIDR: ');
    var devices = getNumber('Number of devices: ', 1);

    while (subnet < vpc) {
        console.log('This subnet CIDR is not consistent with the VPC CIDR.');
        subnet = getCidr('Enter another subnet CIDR: ');
    }
    console.log('The subnet CIDR is consistent with the VPC CIDR.');
    var available = Math.pow(2, 32 - subnet) - 5;
    console.log('AWS reserves 5 IP addresses in each subnet.');
    console.log('Usable IP addresses: ' + available);
    console.log('Devices requested: ' + devices);
    if (available >= devices) {
        console.log('The subnet has enough IP addresses.');
        console.log('Unused IP addresses: ' + (available - devices));
    } else {
        console.log('The subnet does not have enough IP addresses.');
        console.log('Additional IP addresses needed: ' + (devices - available));
    }
}

function computeSelector() {
    console.log('\nCompute Environment Selector');
    var name = '';
    while (name === '') {
        name = readline.question('Application name: ').trim();
        if (name === '') console.log('Please enter an application name.');
    }
    var users = getNumber('Monthly users: ', 0);
    var budget;
    while (true) {
        var answer = readline.question('Monthly budget ($): ').trim();
        budget = Number(answer);
        if (answer !== '' && Number.isFinite(budget) && budget >= 0) break;
        console.log('Enter a valid budget.');
    }
    var ha;
    while (true) {
        ha = readline.question('High availability? (yes/no): ').trim().toLowerCase();
        if (ha === 'yes' || ha === 'no' || ha === 'y' || ha === 'n') break;
        console.log('Please enter yes or no.');
    }

    var level;
    if (users > 10000 || ha === 'yes' || ha === 'y') level = 3;
    else if (users >= 1000) level = 2;
    else level = 1;

    console.log('\nApplication: ' + name);
    if (level === 1) console.log('Recommendation: Single EC2');
    else if (level === 2) console.log('Recommendation: EC2 + Load Balancer');
    else console.log('Recommendation: EC2 + Load Balancer + Auto Scaling');

    if (budget < 1000 && level > 1) {
        console.log('Warning: Budget is under $1000 for this setup.');
    } else if (budget >= 1000 && budget <= 3000 && level === 3) {
        console.log('Warning: Auto Scaling may need a higher budget.');
    }
}

var again = 'yes';
while (again === 'yes' || again === 'y') {
    console.log('\nInfrastructure Decision Tool');
    console.log('1. Subnet Host Checker');
    console.log('2. Compute Environment Selector');
    console.log('3. Exit');
    var choice = getNumber('Choose an option: ', 1, 3);
    if (choice === 1) subnetChecker();
    else if (choice === 2) computeSelector();
    else break;

    while (true) {
        again = readline.question('\nWould you like to run another tool? (yes/no): ').trim().toLowerCase();
        if (['yes', 'y', 'no', 'n'].includes(again)) break;
        console.log('Please enter yes or no.');
    }
}
console.log('Goodbye!');
