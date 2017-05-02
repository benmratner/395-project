//
//  HomeScreenViewController.swift
//  harmonizr
//
//  Created by Minhal Gardezi on 4/27/17.
//  Copyright © 2017 Minhal Gardezi. All rights reserved.
//

import UIKit
import Firebase
import GoogleSignIn

class HomeScreenViewController: UIViewController, GIDSignInUIDelegate {


    override func viewDidLoad() {
        super.viewDidLoad()
        
        GIDSignIn.sharedInstance().uiDelegate = self
        GIDSignIn.sharedInstance().signIn()
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    
    @IBAction func skipAuth(_ sender: Any) {
                self.performSegue(withIdentifier: "toPlaylist", sender: self)
    }
    
}

