resource "aws_dynamodb_table" "notes" {
  name           = "notes"
  billing_mode   = "PROVISIONED"
  read_capacity  = 1
  write_capacity = 1
  hash_key       = "id"

  attribute {
    name = "id"
    type = "S"
  }

//------further possible parameters-----
//  ttl { 
//     enabled = true
//     attribute_name = "expiryPeriod"  
//  }
//  point_in_time_recovery { enabled = true } 
//  server_side_encryption { enabled = true } 
//  lifecycle { ignore_changes = [ "write_capacity", "read_capacity" ] }
} 

//module  "table_autoscaling" { 
//   source = "snowplow-devops/dynamodb-autoscaling/aws" 
//   table_name = aws_dynamodb_table.tf_notes_table.name
//}
