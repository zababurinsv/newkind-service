//###############################################################################
//##
//# Copyright (C) 2014-2015 Andrea Rocco Lotronto, 2017 Nicola Peditto
//##
//# Licensed under the Apache License, Version 2.0 (the "License");
//# you may not use this file except in compliance with the License.
//# You may obtain a copy of the License at
//##
//# http://www.apache.org/licenses/LICENSE-2.0
//##
//# Unless required by applicable law or agreed to in writing, software
//# distributed under the License is distributed on an "AS IS" BASIS,
//# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//# See the License for the specific language governing permissions and
//# limitations under the License.
//##
//###############################################################################



var WebSocketServer, bindSockets, http, net, url, wst_server_reverse;
var httpProxy = require('http-proxy');
let proxy = httpProxy.createProxyServer({});
WebSocketServer = require('websocket').server;
http = require('http');
url = require("url");
net = require("net");
bindSockets = require("./bindSockets_reverse");
let allow_list_file = undefined
uuid = require('node-uuid');
let isReversePort = false
console.log("WSTUN STARTED!");

https_flag = null;

var allow_list; 

var eventEmitter = require('events').EventEmitter;
eventEmitter.prototype._maxListeners = 1000;

var newWSTCP_DATA = new eventEmitter();

wst_server_reverse = function(options) {

  if(options != undefined) {

    console.log("[SYSTEM] - WS Reverse Tunnel Server starting with these paramters:\n" + JSON.stringify(options, null, "\t"));
    this.dstHost = options.dstHost;
    this.dstPort = options.dstPort;

    https_flag = options.ssl;
    allow_list_file = options.allow;
    
    // console.log("allow_list_file: " + allow_list_file);

  }
  else
    console.log("[SYSTEM] - WS Reverse Tunnel Server starting...");


  if(https_flag == "true"){
    
    //HTTPS
    console.log("[SYSTEM] - WS Reverse Tunnel Server over HTTPS.");
    var https = require('https');
    var fs = require('fs');

    require("../lib/https_override"); //add parameters overriding each https request
    
    https_flag = options.ssl;

    try{
      // certificates loading from file
      this.s4t_key = fs.readFileSync(options.key, 'utf8');
      this.s4t_cert = fs.readFileSync(options.cert, 'utf8');
      
    }catch (err) {
      // handle the error safely
      console.log("[SYSTEM] --> ERROR: " + err);
      process.exit(1);

    }

    var credentials = {
      key: this.s4t_key,
      cert: this.s4t_cert
    };

    this.httpServer = https.createServer(credentials, function(request, response) {
      // console.log(request, response);
      //response.writeHead(404);
      //return response.end();
        if(!isReversePort) {
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write("<!DOCTYPE 'html'>");
            response.write("<html>");
            response.write("<head>");
            response.write("<title>xArt</title>");
            response.write("</head>");
            response.write("<body>");
            response.write(`<div>
                     <fieldset>
                           <legend>Empty</legend>
                           <img href="https://i.imgur.com/xeqHFPH.jpg" src="https://i.imgur.com/xeqHFPH.jpg"/>
                     <span>Await client connections...</span>   
                     </fieldset>
                     
                     </div>`);
            response.write("</body>");
            response.write("</html>");
            response.end();
        } else {
            proxy.web(request, response,{target: `http://127.0.0.1:5005`})
        }

    });
    

  }else{
      
    //HTTP
    console.log("[SYSTEM] - WS Reverse Tunnel Server over HTTP.");
    this.httpServer = http.createServer(function(request, response) {
        //console.log(request, response);
      //response.writeHead(404);
      //return response.end();
        if(!isReversePort) {
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write("<!DOCTYPE 'html'>");
            response.write("<html>");
            response.write("<head>");
            response.write("<title>xArt</title>");
            response.write("</head>");
            response.write("<body>");
            response.write(`<div>
                     <fieldset>
                           <legend>Empty</legend>
                           <img href="https://i.imgur.com/xeqHFPH.jpg" src="https://i.imgur.com/xeqHFPH.jpg"/>
                     <span>Await client connections...</span>   
                     </fieldset>
                     </div>`);
            response.write("</body>");
            response.write("</html>");
            response.end();
        } else {
            proxy.web(request, response,{target: `http://127.0.0.1:5005`})
        }
    });
    
  }

  //create websocket
  this.wsServerForControll = new WebSocketServer({
    httpServer: this.httpServer,
    autoAcceptConnections: false
  });

};

wst_server_reverse.prototype.start = function(port) {

  if (https_flag == "true")
    console.log("[SYSTEM] - WS Reverse Tunnel Server starting on: wss://localhost:" + port + " - CERT: \n" + this.s4t_cert);
  else
    console.log("[SYSTEM] - WS Reverse Tunnel Server starting on: ws://localhost:" + port);

  //Activate HTTP/S server
  this.httpServer.listen(port, function() {
    console.log("[SYSTEM] - WS Reverse Tunnel Server is listening...");
  });


  this.wsServerForControll.on('request', (function(_this){
    return function(request){

      //Create one TCP server for each client WebSocketRequest
      request.tcpServer = new net.createServer();

      var uri = url.parse(request.httpRequest.url, true);

      var src_address = request.httpRequest.client._peername.address.split(":")[3];

      if (uri.query.dst != undefined){

        var remoteAddr = uri.query.dst;
        var client_uuid = uri.query.uuid;
        ref1 = remoteAddr.split(":");
        var portTcp = ref1[1];
        
        if(client_uuid != undefined){
            isReversePort = true
            console.log("[SYSTEM] WebSocket creation towards " + src_address + " on port " + portTcp + " from client " + client_uuid);
        }
        else{
            isReversePort = true
            console.log("[SYSTEM] WebSocket creation towards " + src_address + " on port " + portTcp );
        }

        if(allow_list_file != undefined ){
            if(client_uuid != undefined){
                
                var fs = require('fs');

                try{
                    // allowlist loading from file
                    allow_list = JSON.parse(fs.readFileSync(allow_list_file));
                    //console.log(allow_list);
                    }catch (err) {
                    // handle the error safely
                    console.log("[SYSTEM] --> ERROR: " + err);
                    process.exit(1);
                }
                
                var c =  allow_list.filter(it => it.client === client_uuid);
                if (c.length > 0){
                    console.log("[SYSTEM] --> Client " + client_uuid + " found in the allowlist as " + JSON.stringify(c));
                    var p = c.filter(it => it.port === portTcp);
                }
                else
                    console.log("[SYSTEM] --> Client " + client_uuid + " not found in the allowlist");
                    
                if(p != undefined && p.length > 0 && p[0].port == portTcp){
                    console.log("[SYSTEM] --> Port is allowed: " + portTcp);
                    request.tcpServer.listen(portTcp);
                    console.log("[SYSTEM] --> TCP server is listening on port " + portTcp);

                    request.wsConnectionForControll = request.accept('tunnel-protocol', request.origin);
                    console.log("[SYSTEM] --> WS connection created");
                    
                    request.wsConnectionForControll.on('close', function(reasonCode, description) {
                    isReversePort = false
                    console.log("[SYSTEM] - WebSocket Controll Peer " + request.wsConnectionForControll.remoteAddress + " disconnected - Reason: ["+reasonCode+"] " + description);
                    console.log("[SYSTEM] --> Close websocket server on port " + portTcp);
                    request.tcpServer.close();
                    });
                    
                }
                else{
                    console.log("Port is not allowed: " + portTcp + " so the connection is not authorized");
                    //reject the request
                    request.reject(401, "Request unauthorized!");
                    console.log("[SYSTEM] --> WS connection closed");                    
                }
            }
            else{
                    console.log("Client is not specified so the connection is not authorized.");
                    //reject the request
                    request.reject(401, "Request unauthorized!");
                    console.log("[SYSTEM] --> WS connection closed");                    
                
            }
        }
        else{
            request.tcpServer.listen(portTcp);
            console.log("[SYSTEM] --> TCP server is listening on port " + portTcp);

            request.wsConnectionForControll = request.accept('tunnel-protocol', request.origin);
            console.log("[SYSTEM] --> WS connection created");
            
            request.wsConnectionForControll.on('close', function(reasonCode, description) {
            isReversePort = false
            console.log("[SYSTEM] - WebSocket Controll Peer " + request.wsConnectionForControll.remoteAddress + " disconnected - Reason: ["+reasonCode+"] " + description);
            console.log("[SYSTEM] --> Close websocket server on port " + portTcp);
            request.tcpServer.close();
            });
        }
      }
      else{
        //REQUEST FOR WS USED FOR DATA
        console.log("[SYSTEM] --> WebSocket Request for Data");
        newWSTCP_DATA.emit('created', request);
      }

      //Manage TCP error events
      request.tcpServer.on('error', function(message) {
        if(message.code == "EADDRINUSE"){
          console.log("[SYSTEM] - Error - Port " + message.port + " already used: connection aborted.");
          request.wsConnectionForControll.close();
        }else
          console.log("[SYSTEM] - Error establishing TCP connection: " + message);
          
      });

      //Manage TCP Connection event
      request.tcpServer.on('connection', (function(_this){
        
        return function(tcpConn){

          tcpConn.wsConnection;
          
          //Putting in pause the tcp connection waiting the new socket WS Socket for data
          tcpConn.pause();
          var idConnection = uuid.v4();
          var msgForNewConnection = "NC:"+idConnection;
          
          request.wsConnectionForControll.sendUTF(msgForNewConnection);
          
          var EventManager = (function(_this){

            return function(request){

              try{

                var uri = url.parse(request.httpRequest.url, true);
                
                if(idConnection == uri.query.id){

                  //tcpConn.wsConnection = wsTCP;
                  tcpConn.wsConnection = request.accept('tunnel-protocol', request.origin);
                  bindSockets(tcpConn.wsConnection, tcpConn);
                  //DEBUG console.log("Bind ws tcp");

                  //Resuming of the tcp connection after WS Socket is just created
                  tcpConn.resume();
                  //DEBUG console.log("TCP RESUME");
                  newWSTCP_DATA.removeListener('created', EventManager);
                }

              }catch (err) {
                // handle the error
                console.log("[SYSTEM] --> ERROR: " + err);
                request.tcpServer.close();
                newWSTCP_DATA.removeListener('created', EventManager);
              }
              
            }

          })(this)
  
          newWSTCP_DATA.on('created', EventManager);

        }
        
      })(_this));

    }
  })(this));
};


module.exports = wst_server_reverse;
