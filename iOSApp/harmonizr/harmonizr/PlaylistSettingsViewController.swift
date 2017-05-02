//
//  PlaylistSettingsViewController.swift
//  harmonizr
//
//  Created by Minhal Gardezi on 5/1/17.
//  Copyright © 2017 Minhal Gardezi. All rights reserved.
//

import Foundation
import UIKit

class PlaylistSettingsViewController: UIViewController{
    @IBAction func saveChanges(_ sender: Any) {
    }
    var playlistName:String = ""
    @IBOutlet weak var textField: UITextField!
    
    override func viewDidLoad() {
        textField.text = playlistName
    }
    
    
}
