//
//  AppSettingsViewController.swift
//  harmonizr
//
//  Created by Minhal Gardezi on 5/1/17.
//  Copyright © 2017 Minhal Gardezi. All rights reserved.
//
//
import Foundation
import AVFoundation
import SafariServices

class AppSettingsViewController: UIViewController, SPTAudioStreamingPlaybackDelegate, SPTAudioStreamingDelegate {
    var auth = SPTAuth.defaultInstance()!
    var session:SPTSession!
    var player: SPTAudioStreamingController?
    var loginUrl: URL?
    
    @IBOutlet weak var spotifyButton: UIButton!
    
    @IBAction func loginPressed(_ sender: Any) {
        //     UIApplication.shared.open(loginUrl!, options: nil, completionHandler: nil)
        
        if UIApplication.shared.openURL(loginUrl!) {
            
            if auth.canHandle(auth.redirectURL) {
                // To do - build in error handling
            }
        }
    }

    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        setup()
        NotificationCenter.default.addObserver(self, selector: #selector(AppSettingsViewController.createLoginSession), name: NSNotification.Name(rawValue: "loginSuccessfull"), object: nil)
        
    }
    
    func createLoginSession () {
        
        self.spotifyButton.isHidden = true
        let userDefaults = UserDefaults.standard
        
        if let sessionObj:AnyObject = userDefaults.object(forKey: "SpotifySession") as AnyObject? {
            
            let sessionDataObj = sessionObj as! Data
            let firstTimeSession = NSKeyedUnarchiver.unarchiveObject(with: sessionDataObj) as! SPTSession
            
            self.session = firstTimeSession
            self.spotifyButton.isHidden = true
            
//            SPTPlaylistList.createPlaylist(withName: "my super dooper", forUser: session.canonicalUsername, publicFlag: true, accessToken: session.accessToken, callback: { (error, snapshot) in
//                snapshot?.addTracks(toPlaylist: <#T##[Any]!#>, withAccessToken: <#T##String!#>, callback: <#T##SPTMetadataErrorableOperationCallback!##SPTMetadataErrorableOperationCallback!##(Error?) -> Void#>)
//            })
            
        }
        
    }

    func setup(){
        let redirectURL = "harmonizr://returnAfterLogin" // put your redirect URL here
        let clientID = "0ea96f1f87784602bedaf274759b0017" // put your client ID here
        auth.redirectURL = URL(string: redirectURL)
        auth.clientID  = "0ea96f1f87784602bedaf274759b0017"
        auth.requestedScopes = [SPTAuthStreamingScope, SPTAuthPlaylistReadPrivateScope, SPTAuthPlaylistModifyPublicScope, SPTAuthPlaylistModifyPrivateScope]
        loginUrl = auth.spotifyWebAuthenticationURL()
    }
    
    
    


}
