//
//  ResolveDNS.swift
//  STBDiagnostics
//
//  Created by Ahmad Akmaluddin on 13/05/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation

@objc(ResolveDNS)

class ResolveDNS: NSObject {
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  @objc
  func test(_ address: NSString, resolver resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) -> Void{
    let host = CFHostCreateWithName(nil,address as CFString).takeRetainedValue()
    let start = DispatchTime.now()
    CFHostStartInfoResolution(host, .addresses, nil)
    var success: DarwinBoolean = false
    var numAddress = String("")
    if let addresses = CFHostGetAddressing(host, &success)?.takeUnretainedValue() as NSArray?,
      let theAddress = addresses.firstObject as? NSData {
      var hostname = [CChar](repeating: 0, count: Int(NI_MAXHOST))
      if getnameinfo(theAddress.bytes.assumingMemoryBound(to: sockaddr.self), socklen_t(theAddress.length),
                     &hostname, socklen_t(hostname.count), nil, 0, NI_NUMERICHOST) == 0 {
        numAddress = String(cString: hostname)
      }
    }
    let end = DispatchTime.now()
    let nanoTime = end.uptimeNanoseconds - start.uptimeNanoseconds
    let timeInterval = Double(nanoTime) / 1_000_000
    resolve([timeInterval, numAddress])
  }
  
  @objc
  func ipAddr() {
    NSLog("%@", "test")
  }
}
