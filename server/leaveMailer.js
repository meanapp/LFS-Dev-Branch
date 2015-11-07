var sendgrid=require('sendgrid')('LFS Quinnox','lfsQuinnox_2015');
var hogan= require('hogan.js');
var express = require('express');
var router=express.Router();
var fs = require('fs');
var mailStatus= require('./models/MailStatus.js');




module.exports= function(templateName,to,firstName){

           if(templateName=="Register"){
                console.log("inside Register-->");
                var template=fs.readFileSync('./views/registration.hjs','utf-8');
                var compiledTemplate =hogan.compile(template);
                sendgrid.send({
                    to:        to,
                    from:     'noreply@lfsquinnox.com',
                    subject:  'Welcome to Leave Forcasting System.',
                    html :    compiledTemplate.render({firstName: firstName})
                }, function(err, json) {
                    if (err) { 
                        new mailStatus({
                            userEmailAddress: to,
                            time : Date.now(),
                            status: "failed"  
                        }).save(function(err,doc){
                                if(err) console.log(err);
                                else console.log("registration mail failed");
                            });
                                console.log("error in sending mail" +err); 
                    }else{
                        new mailStatus({
                            userEmailAddress: to,
                            time : Date.now(),
                            status: "success"  
                        }).save(function(err,doc){
                            if(err) console.log(err);
                            else console.log("Registration mail sent successfully");
                        });
                        
                    }
                                       
    
                    });
           }

           if(templateName=="Reset_Password"){
            console.log("inside resetpassword--->");
            var template=fs.readFileSync('./views/ResetPassword.hjs','utf-8');
                                var compiledTemplate =hogan.compile(template);
                                sendgrid.send({
                                        to:        to,
                                        from:     'noreply@lfsquinnox.com',
                                        subject:  'Password Reset,Leave forecasting system',
                                        html :    compiledTemplate.render({firstName: firstName})
                                }, function(err, json) {
                                    if (err) { new mailStatus({
                                            userEmailAddress: to,
                                            time : Date.now(),
                                            status: "failed"  
                                            }).save(function(err,doc){
                                                if(err) console.log(err);
                                                else console.log("Reset Password mail failed");
                                             });
                                         console.log("error in sending mail" +err);  }
                                    else{ new mailStatus({
                                            userEmailAddress: to,
                                            time : Date.now(),
                                            status: "success"  
                                            }).save(function(err,doc){
                                                if(err) console.log(err);
                                                else console.log("Reset password mail succesfully sent");
                                             });
                                    }
                                });

           }

           if(templateName=="New_Leave_Request"){
            console.log("inside New_Leave_Request-->");
var template=fs.readFileSync('./views/LeaveCreated.hjs','utf-8');
                                var compiledTemplate =hogan.compile(template);
                                sendgrid.send({
                                        to:        to,
                                        from:     'noreply@lfsquinnox.com',
                                        subject:  'Leave request created',
                                        html :    compiledTemplate.render({firstName: firstName})
                                }, function(err, json) {
                                    if (err) { new mailStatus({
                                            userEmailAddress: to,
                                            time : Date.now(),
                                            status: "failed"  
                                            }).save(function(err,doc){
                                                if(err) console.log(err);
                                                else console.log("New leave request mail failed");
                                             });
                                         console.log("error in sending mail" +err);  }
                                    else{ new mailStatus({
                                            userEmailAddress: to,
                                            time : Date.now(),
                                            status: "success"  
                                            }).save(function(err,doc){
                                                if(err) console.log(err);
                                                else console.log("New leave request mail sent");
                                             });
                                         }
                                });
           }

           if(templateName=="Leave_status"){
            console.log("inside Leave_status-->");
            var template=fs.readFileSync('./views/LeaveStatus.hjs','utf-8');
                                var compiledTemplate =hogan.compile(template);
                                sendgrid.send({
                                        to:        to,
                                        from:     'noreply@lfsquinnox.com',
                                        subject:  'Leave Status changed!!! Leave forecasting System',
                                        html :    compiledTemplate.render({firstName: firstName})
                                }, function(err, json) {
                                    if (err) { new mailStatus({
                                            userEmailAddress: to,
                                            time : Date.now(),
                                            status: "failed"  
                                            }).save(function(err,doc){
                                                if(err) console.log(err);
                                                else console.log("Leave status mail failed");
                                             });
                                         console.log("error in sending mail" +err);  }
                                    else{ new mailStatus({
                                            userEmailAddress: to,
                                            time : Date.now(),
                                            status: "success"  
                                            }).save(function(err,doc){
                                                if(err) console.log(err);
                                                else console.log("Leave status mail sent succesfully");
                                             });
                                        }
                                });
           }
}