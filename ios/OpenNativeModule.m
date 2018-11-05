//
//  OpenNativeModule.m
//  SecondProject
//
//  Created by wanglong on 2018/11/5.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "OpenNativeModule.h"
#import "AppDelegate.h"
#import "NativeViewController.h"

@implementation OpenNativeModule

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(openNativeVC:(NSString *)tag) {
  switch ([tag integerValue]) {
    case 1:
      dispatch_async(dispatch_get_main_queue(), ^{
        AppDelegate *delegate = (AppDelegate *)([UIApplication sharedApplication].delegate);
        UINavigationController *rootNav = delegate.navC;
        NativeViewController *nativeVC = [[NativeViewController alloc] init];
        [rootNav pushViewController:nativeVC animated:YES];
      });
      break;
      
    case 2:
      dispatch_async(dispatch_get_main_queue(), ^{
        AppDelegate *delegate = (AppDelegate *)([UIApplication sharedApplication].delegate);
        UINavigationController *rootNav = delegate.navC;
        NativeViewController *nativeVC = [[NativeViewController alloc] init];
        [rootNav pushViewController:nativeVC animated:YES];
      });
      break;
    default:
      break;
  }

}
@end
