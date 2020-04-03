# NodeJS Server Performance checking using MongoDB database (NoSQL architecture):

Aim of this small project: checking NodeJS (https://nodejs.org/en/) server stability as a web-server against DB transactions of 1 or > 20 million JSON object-db inserts via MongoDb community server database (https://www.mongodb.com/download-center/community). 

This performance test had been conducting using Node JS v10.15.2 and MongoDB version: 4.2.5 Community, using an ACER notebook equipped with Linux Mint OS Debian based version (LMDE 4 Debbie Cinnamon version 4.4.8 and Kernel version 4.19), with a 12 GB RAM and an Intel i7 (7th Gen.) CPU.

To run the code, use one of below commands. Attached the JavaScript NodeJS source code and results as pictures. Feel free to use it and change it accordingly.

Run NodeJS server with memory heap 6GB to reach 1 million db records (insertions): 
$ node --max-old-space-size=6000 performance_final_code_nodejs_db_level_test_mohee_1million_recs.js 1000000

or

Run NodeJS server with memory heap 14GB (I used a Linux Swap memory of 10GB here) to reach 20 millions db records (insertions): 
$ node --max-old-space-size=14000 performance_final_code_nodejs_db_level_test_mohee_1million_recs.js 20000000


If you have any constructive remarks, happy to hear it on my e-mail: jarada.mohee@gmail.com
Greetings from 32C in Doha - March 30, 2020
Mohee Jarada
