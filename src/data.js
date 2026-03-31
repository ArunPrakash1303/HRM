

const employees = [
  {id:1,name:'Priya Nair',role:'Senior Engineer',dept:'Engineering',email:'priya@peopleos.com',status:'Active',avatar:'PN',joinDate:'2021-03-15',location:'Chennai'},
  {id:2,name:'Arjun Mehta',role:'Product Manager',dept:'Product',email:'arjun@peopleos.com',status:'Active',avatar:'AM',joinDate:'2020-07-22',location:'Bangalore'},
  {id:3,name:'Kavitha Rajan',role:'UX Designer',dept:'Design',email:'kavitha@peopleos.com',status:'Active',avatar:'KR',joinDate:'2022-01-10',location:'Chennai'},
  {id:4,name:'Rohit Kumar',role:'Data Scientist',dept:'Analytics',email:'rohit@peopleos.com',status:'On Leave',avatar:'RK',joinDate:'2021-11-05',location:'Hyderabad'},
  {id:5,name:'Sneha Pillai',role:'HR Executive',dept:'Human Resources',email:'sneha@peopleos.com',status:'Active',avatar:'SP',joinDate:'2023-02-14',location:'Chennai'},
  {id:6,name:'Vikram Shah',role:'Backend Engineer',dept:'Engineering',email:'vikram@peopleos.com',status:'Active',avatar:'VS',joinDate:'2020-09-01',location:'Mumbai'},
  {id:7,name:'Anjali Krishnan',role:'Marketing Lead',dept:'Marketing',email:'anjali@peopleos.com',status:'Active',avatar:'AK',joinDate:'2022-06-20',location:'Bangalore'},
  {id:8,name:'Deepak Pandey',role:'DevOps Engineer',dept:'Engineering',email:'deepak@peopleos.com',status:'Inactive',avatar:'DP',joinDate:'2019-12-03',location:'Pune'},
];
const deptColors={'Engineering':'#1A237E','Product':'#8B5CF6','Design':'#EC4899','Analytics':'#F59E0B','Human Resources':'#10B981','Marketing':'#3B82F6'};
const candidates=[
  {id:1,name:'Arun Kumar',role:'Full Stack Developer',stage:'Interview',score:85,avatar:'AK',experience:'4 years'},
  {id:2,name:'Meera Iyer',role:'UI/UX Designer',stage:'Shortlisted',score:78,avatar:'MI',experience:'3 years'},
  {id:3,name:'Suresh Patel',role:'Data Analyst',stage:'Applied',score:62,avatar:'SP',experience:'2 years'},
  {id:4,name:'Divya Reddy',role:'Product Manager',stage:'Selected',score:92,avatar:'DR',experience:'6 years'},
  {id:5,name:'Kiran Joshi',role:'Backend Engineer',stage:'Rejected',score:45,avatar:'KJ',experience:'1 year'},
  {id:6,name:'Pooja Sharma',role:'Frontend Developer',stage:'Interview',score:80,avatar:'PS',experience:'3 years'},
  {id:7,name:'Rahul Nair',role:'DevOps Engineer',stage:'Shortlisted',score:73,avatar:'RN',experience:'5 years'},
];
const stageColors={Applied:'#3B82F6',Shortlisted:'#8B5CF6',Interview:'#F59E0B',Selected:'#10B981',Rejected:'#EF4444'};
const interviews2=[
  {id:1,candidate:'Arun Kumar',role:'Full Stack Developer',date:'Jan 22',time:'10:00 AM',interviewer:'Arjun Mehta',type:'Technical',status:'Scheduled',avatar:'AK'},
  {id:2,candidate:'Meera Iyer',role:'UI/UX Designer',date:'Jan 22',time:'2:00 PM',interviewer:'Kavitha Rajan',type:'Portfolio Review',status:'Scheduled',avatar:'MI'},
  {id:3,candidate:'Pooja Sharma',role:'Frontend Developer',date:'Jan 23',time:'11:00 AM',interviewer:'Priya Nair',type:'Live Coding',status:'Pending',avatar:'PS'},
  {id:4,candidate:'Rahul Nair',role:'DevOps Engineer',date:'Jan 24',time:'3:00 PM',interviewer:'Vikram Shah',type:'Technical',status:'Pending',avatar:'RN'},
  {id:5,candidate:'Divya Reddy',role:'Product Manager',date:'Jan 20',time:'9:00 AM',interviewer:'Arjun Mehta',type:'HR Round',status:'Completed',avatar:'DR'},
];
const documents2=[
  {id:1,name:'Employee Handbook 2024.pdf',type:'PDF',folder:'Policies',size:'2.4 MB',modified:'Jan 15',color:'#EF4444',icon:'picture_as_pdf'},
  {id:2,name:'Leave Policy v3.docx',type:'DOCX',folder:'Policies',size:'345 KB',modified:'Jan 10',color:'#3B82F6',icon:'description'},
  {id:3,name:'Offer Letter Template.docx',type:'DOCX',folder:'Templates',size:'120 KB',modified:'Jan 8',color:'#3B82F6',icon:'description'},
  {id:4,name:'Q4 Hiring Report.xlsx',type:'XLSX',folder:'Reports',size:'890 KB',modified:'Jan 18',color:'#10B981',icon:'table_chart'},
  {id:5,name:'Performance Review Form.pdf',type:'PDF',folder:'Templates',size:'567 KB',modified:'Jan 5',color:'#EF4444',icon:'picture_as_pdf'},
  {id:6,name:'Org Chart Jan 2024.png',type:'PNG',folder:'General',size:'1.2 MB',modified:'Jan 20',color:'#8B5CF6',icon:'image'},
];
const jobOpenings=[
  {id:1,title:'Senior Frontend Developer',dept:'Engineering',location:'Chennai / Remote',type:'Full-time',openings:3,applicants:24,status:'Active'},
  {id:2,title:'Product Designer',dept:'Design',location:'Bangalore',type:'Full-time',openings:1,applicants:18,status:'Active'},
  {id:3,title:'Data Scientist',dept:'Analytics',location:'Remote',type:'Full-time',openings:2,applicants:31,status:'Active'},
  {id:4,title:'Marketing Specialist',dept:'Marketing',location:'Mumbai',type:'Contract',openings:1,applicants:12,status:'Paused'},
];
const hiringData=[{m:'Aug',a:45,h:8},{m:'Sep',a:62,h:12},{m:'Oct',a:58,h:10},{m:'Nov',a:75,h:15},{m:'Dec',a:48,h:7},{m:'Jan',a:90,h:18}];
const deptData2=[{d:'Engineering',c:28,color:'#1A237E'},{d:'Product',c:10,color:'#8B5CF6'},{d:'Design',c:8,color:'#EC4899'},{d:'Marketing',c:12,color:'#3B82F6'},{d:'HR',c:5,color:'#10B981'},{d:'Analytics',c:7,color:'#F59E0B'}];
const retData=[{m:'Jul',r:94},{m:'Aug',r:96},{m:'Sep',r:95},{m:'Oct',r:97},{m:'Nov',r:95},{m:'Dec',r:98},{m:'Jan',r:97}];
const codeSnippets={
  javascript:`// Two Sum Problem
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}

// Test cases
console.log(twoSum([2, 7, 11, 15], 9));  // [0, 1]
console.log(twoSum([3, 2, 4], 6));        // [1, 2]
console.log(twoSum([3, 3], 6));           // [0, 1]`,
  python:`# Two Sum Problem
def twoSum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

# Test cases
print(twoSum([2, 7, 11, 15], 9))  # [0, 1]
print(twoSum([3, 2, 4], 6))       # [1, 2]
print(twoSum([3, 3], 6))          # [0, 1]`,
  java:`// Two Sum Problem
import java.util.HashMap;
public class Solution {
    public int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] {map.get(complement), i};
            }
            map.put(nums[i], i);
        }
        return new int[]{};
    }
}`,
  cpp:`// Two Sum Problem
#include <vector>
#include <unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> map;
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (map.count(complement)) {
            return {map[complement], i};
        }
        map[nums[i]] = i;
    }
    return {};
}`
};


export { employees, deptColors, candidates, stageColors, interviews2, documents2, jobOpenings, hiringData, deptData2, retData, codeSnippets };
