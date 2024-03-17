#include <iostream> 
    using namespace std;
    // Define the main function
    int main() { 
        int arr[4];
        int s=0;
        for(int i=0;i<4;i++)
        {
          cin>>arr[i];
          s+=arr[i];
        }
        cout<<s;
        return 0;  
    }