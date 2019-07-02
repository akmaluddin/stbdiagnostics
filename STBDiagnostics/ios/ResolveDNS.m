//
//  ResolveDNS.m
//  STBDiagnostics
//
//  Created by Ahmad Akmaluddin on 13/05/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(ResolveDNS, NSObject)

RCT_EXTERN_METHOD(test: (NSString)address
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  )
RCT_EXTERN_METHOD(ipAddr)

@end
