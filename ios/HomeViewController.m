//
//  HomeViewController.m
//  SecondProject
//
//  Created by wanglong on 2018/10/30.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "HomeViewController.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>


@interface HomeViewController ()

@end

@implementation HomeViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
  
  self.view.backgroundColor = [UIColor whiteColor];
  self.navigationItem.title = @"首页";
  NSLog(@"--HomeViewController---");
  
  UIButton *goRNPage = [UIButton buttonWithType:UIButtonTypeSystem];
  goRNPage.frame = CGRectMake(100, 100, 100, 60);
  [goRNPage setTitle:@"跳转进入RN" forState:UIControlStateNormal];
  [goRNPage addTarget:self action:@selector(goRNAction:) forControlEvents:UIControlEventTouchUpInside];
  [self.view addSubview:goRNPage];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)goRNAction:(UIButton *)button{
  NSLog(@"------goRNAction------");
  
  NSURL *jsCodeLocation;
  
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"SecondProject"
                                               initialProperties:nil
                                                   launchOptions:nil];
  
   UIViewController *reactNativeVC = [UIViewController new];
  reactNativeVC.view = rootView;
  reactNativeVC.title = @"cnode";
  [self.navigationController setNavigationBarHidden:YES animated:YES];
  [self.navigationController pushViewController:reactNativeVC animated:YES];
}

@end
