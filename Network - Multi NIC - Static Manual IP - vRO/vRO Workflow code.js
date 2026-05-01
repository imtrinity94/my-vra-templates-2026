/* Inputs:
inputProperties : Properties
*/
/*Outputs:
addresses : Array/Array
gateways : Array/Array
dnsServers : Array/Array
domains : Array/Array
cidrs : Array/Array
dnsSearchDomains : Array/Array
*/

// Extract values from inputProperties (NIC 1)
var gateway1 = inputProperties.customProperties["Nic1_Gateway"];
var ipAddress1 = inputProperties.customProperties["Nic1_Ip"];
var subnetNetmask1 = inputProperties.customProperties["Nic1_Netmask"];

// Extract values from inputProperties (NIC 2)
var gateway2 = inputProperties.customProperties["Nic2_Gateway"];
var ipAddress2 = inputProperties.customProperties["Nic2_Ip"];
var subnetNetmask2 = inputProperties.customProperties["Nic2_Netmask"];

// Shared Settings
var dnsString = inputProperties.customProperties["VmDns"]; 
var domain = inputProperties.customProperties["VmDomain"]; 
var searchDomain = inputProperties.customProperties["VmSearchDomain"]; 

// Calculate CIDRs using your module
var cidr1 = System.getModule("aaaa.mayank.staticIpTesting").calculateCidrNotation(gateway1, subnetNetmask1);
var cidr2 = System.getModule("aaaa.mayank.staticIpTesting").calculateCidrNotation(gateway2, subnetNetmask2);

// === Gateways (3D array) ===
// Format: [ [ [nic1_gw], [nic2_gw] ] ]
var gateways = [];
var vm_gateways = [];
vm_gateways.push([String(gateway1)]);
vm_gateways.push([String(gateway2)]);
gateways.push(vm_gateways);

// === IP Addresses (2D array) ===
// Format: [ [nic1_ip, nic2_ip] ]
var addresses = [];
var vm_addresses = [String(ipAddress1), String(ipAddress2)];
addresses.push(vm_addresses);

// === DNS Servers ===
var dnsServers = [];
var vm_dnsServers = [];

// Clean the string if it arrives as '["value"]'
var cleanDnsString = String(dnsString).replace(/[\[\]\"]/g, ""); 

var dnsList = cleanDnsString.split(",").map(function(dns) {
    return String(dns).trim();
});
vm_dnsServers.push(dnsList); 
dnsServers.push(vm_dnsServers);

// === DNS Search Domains ===
var dnsSearchDomains = [];
var vm_dnsSearch = [];

// Clean the string if it arrives as '["value"]'
var cleanSearchDomain = String(searchDomain).replace(/[\[\]\"]/g, "");

vm_dnsSearch.push([cleanSearchDomain.trim()]); 
dnsSearchDomains.push(vm_dnsSearch);

// === Domains (2D array) ===
var domains = [];
var vm_domains = [String(domain)];
domains.push(vm_domains);

// === CIDRs (2D array) ===
// Format: [ [nic1_cidr, nic2_cidr] ]
var cidrs = [];
var vm_cidrs = [String(cidr1), String(cidr2)];
cidrs.push(vm_cidrs);

// Logging
System.log("Gateways: " + JSON.stringify(gateways));
System.log("Addresses: " + JSON.stringify(addresses));
System.log("CIDRs: " + JSON.stringify(cidrs));
System.log("DNS Servers: " + JSON.stringify(dnsServers));
System.log("Domains: " + JSON.stringify(domains));
System.log("DNS Search Domains: " + JSON.stringify(dnsSearchDomains));

/* Output
2026-05-01 13:01:40.050 +00:00infoGateways: [[["172.10.20.1"],["172.10.20.1"]]]
2026-05-01 13:01:40.052 +00:00infoAddresses: [["172.10.20.98","172.10.20.63"]]
2026-05-01 13:01:40.053 +00:00infoCIDRs: [["172.10.20.0/24","172.10.20.0/24"]]
2026-05-01 13:01:40.054 +00:00infoDNS Servers: [[["172.10.20.2"]]]
2026-05-01 13:01:40.055 +00:00infoDomains: [["vcf.lab"]]
2026-05-01 13:01:40.056 +00:00infoDNS Search Domains: [[["vcf.lab"]]]
*/
