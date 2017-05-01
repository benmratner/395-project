//
//  AllPlaylistTableViewController.swift
//  harmonizr
//
//  Created by Minhal Gardezi on 4/28/17.
//  Copyright © 2017 Minhal Gardezi. All rights reserved.
//

import Firebase
import UIKit

class AllPlaylistTableViewController : UITableViewController{
    var ref: FIRDatabaseReference!
    var playlistArray = [String]()
    var selectedID = "";
    var selectedName = ""

    override func viewDidLoad() {
        tableView.delegate = self
        tableView.dataSource = self
        getPlaylists()
    }

    func getPlaylists(){
        let userID = FIRAuth.auth()?.currentUser?.uid
        
        ref = FIRDatabase.database().reference()
        ref.child("userPlaylists").child((FIRAuth.auth()?.currentUser?.uid)!).observe(.childAdded, with: { (snapshot) -> Void in
            let playlist = snapshot.value as? String
            print(self.playlistArray)
            self.playlistArray.append(playlist!)
            self.tableView.reloadData()

        })

    }
    
         
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
            if segue.identifier == "songList" {
                if let indexPath = self.tableView.indexPathForSelectedRow {
                    let cell = self.tableView.cellForRow(at: indexPath)! as UITableViewCell


                if let dest = segue.destination as? PlaylistSongsViewController{
                    dest.playlistID = self.playlistArray[indexPath.row]
                    dest.playlistName = (cell.textLabel?.text)!
                }
            }
        }

    }
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return playlistArray.count
    }
    
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        
        self.performSegue(withIdentifier: "songList", sender: self)
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        var cell:UITableViewCell? =
            self.tableView.dequeueReusableCell(withIdentifier: "playlistCell")! as UITableViewCell
        
        let ID = playlistArray[indexPath.row]
        
        ref.child("playlistSongs").child(ID).observeSingleEvent(of: .value, with: { (snapshot) in
            let name = (snapshot.value! as? NSDictionary)?["name"] as! String
            cell?.textLabel?.text = name
            let songCount = snapshot.childSnapshot(forPath: "songs").childrenCount
            
            cell?.detailTextLabel?.text = songCount.description + " Songs"
            
        })
        
        if (cell == nil)
        {
            cell = UITableViewCell(style: UITableViewCellStyle.subtitle,
                                   reuseIdentifier: "songCell")
        }
        return cell!
    }

}
