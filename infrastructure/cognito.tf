resource "aws_cognito_user_pool" "pool" {
  name = "mypool"

  account_recovery_setting {
      recovery_mechanism {
          name     = "verified_email"
          priority = 1
        }
    }
}