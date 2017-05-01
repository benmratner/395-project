//
//  PlaylistSongsViewController.swift
//  harmonizr
//
//  Created by Minhal Gardezi on 4/29/17.
//  Copyright © 2017 Minhal Gardezi. All rights reserved.
//

import UIKit
import Firebase
import Alamofire

class PlaylistSongsViewController:UITableViewController{
    var ref: FIRDatabaseReference!
    var playlistID = ""
    var playlistName = ""
    typealias JSONStandard = [String : AnyObject]
    var songArray = [String]()
    
    @IBOutlet weak var imageimage: UIImageView!
    override func viewDidLoad() {
        getSongs()

    }
    
    func getSongs(){
        let userID = FIRAuth.auth()?.currentUser?.uid
        self.navigationItem.title = playlistName
       
     

        ref = FIRDatabase.database().reference()
        ref.child("playlistSongs").child(playlistID).child("songs").observe(.childAdded, with: { (snapshot) -> Void in
            let song = snapshot.value as? String
            self.songArray.append(song!)
            self.tableView.reloadData()
        })

    }
    
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return songArray.count
    }
    
    
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "playlistSettings" {
     
                
                if let dest = segue.destination as? PlaylistSettingsViewController{
                    dest.playlistName = playlistName
                }
        }
    }
    @IBAction func toSettings(_ sender: Any) {
        self.performSegue(withIdentifier: "playlistSettings", sender: self)
    }
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        var cell:UITableViewCell? =
            self.tableView.dequeueReusableCell(withIdentifier: "songCell")! as UITableViewCell
        let song = songArray[indexPath.row]
        
        ref.child("songs").child(song).observeSingleEvent(of: .value, with: { (snapshot) in

            let songName = (snapshot.value! as? NSDictionary)?["title"] as! String
            cell?.textLabel?.text = songName
            let artist = (snapshot.value! as? NSDictionary)?["artist"] as! String

            
            var spotifyBool = (snapshot.value! as? NSDictionary)?["spotify"] as! Bool

            if(spotifyBool){
                let requestURL = "https://api.spotify.com/v1/tracks/\(song)"
                Alamofire.request(requestURL).responseJSON(completionHandler: { response in

                    do{
                    var responseJSON = try JSONSerialization.jsonObject(with: response.data!, options: .mutableContainers) as! JSONStandard
                        
                        if let album = responseJSON["album"] as? JSONStandard{
                            if let images = album["images"] as? [JSONStandard]{
                                print(images)
                                let data = images[2]
                                let url =  URL(string: data["url"] as! String)
                                let imageData = NSData(contentsOf: url!)
                                cell?.imageView?.image = UIImage(data: imageData as! Data)
                                cell?.imageView?.clipsToBounds = true
                            
                                
                            }
                            else{
                                
                            }
                        }
                    
                    }
                        catch{
                            
                            
                    }
                    
                })

            }
            
            else{
                
            }
            cell?.detailTextLabel?.text = artist
            
            
        })
        
        if (cell == nil)
        {
            cell = UITableViewCell(style: UITableViewCellStyle.subtitle,
                                   reuseIdentifier: "songCell")
        }
        return cell!
    }
    
    override func tableView(_ tableView: UITableView, canMoveRowAt indexPath: IndexPath) -> Bool {
        return true
    }
    
    override func tableView(_ tableView: UITableView, moveRowAt sourceIndexPath: IndexPath, to destinationIndexPath: IndexPath) {
        
    }
    

}


