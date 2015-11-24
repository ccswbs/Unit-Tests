import javax.swing.*;
import javax.swing.border.*;
import java.awt.*;
import java.awt.event.*;
 
public class runTests extends JFrame
{
	//Variable Declaration
    private static final int WIDTH = 800;
    private static final int HEIGHT = 400;

    private Container pane;
    private JRadioButton runSpecific, runAll;
    private ButtonGroup runGroup;

   	private JLabel testFolderL, testNameL, nodeListL;
   	private JTextField testFolderF, testNameF, nodeListF;

   	private JButton go;

   	private disabledFieldsHandler disabledListener;
     
    // Frame
    public runTests()
    {
    	// Init Radio buttons
    	runSpecific = new JRadioButton("Run Specific Test");
    	runAll = new JRadioButton("Run All Tests");
    	runAll.setSelected(true);
    	disabledListener = new disabledFieldsHandler();
    	runAll.addActionListener(disabledListener);
    	runSpecific.addActionListener(disabledListener);
    	runGroup = new ButtonGroup();
    	runGroup.add(runAll);
    	runGroup.add(runSpecific);

    	// Init Labels and Boxes
    	testFolderL = new JLabel("Test Folder:", SwingConstants.LEFT);
    	testNameL = new JLabel("Test Name:", SwingConstants.LEFT);
    	nodeListL = new JLabel("Nodelist:", SwingConstants.LEFT);
    	testFolderF = new JTextField(20);
    	testNameF = new JTextField(20);
    	nodeListF = new JTextField(20);
    	testFolderF.setEditable(false);
		testNameF.setEditable(false);

    	// Init submit button
    	go = new JButton("GO");
    	go.setBackground(Color.blue);
    	go.setForeground(Color.white);
    	go.setFont(new Font ("Papyrus", Font.BOLD, 30));
    	go.setBorder(new LineBorder(new Color(50, 100, 200), 8));

        setTitle("Unit Tests GUI");
        setSize(WIDTH, HEIGHT);
        setVisible(true);
        setDefaultCloseOperation(EXIT_ON_CLOSE);

        pane = getContentPane();
        pane.setLayout(new GridLayout(0,2,40,40));
        pane.add(runAll);
    	pane.add(runSpecific);
    	pane.add(testFolderL);
    	pane.add(testFolderF);
    	pane.add(testNameL);
    	pane.add(testNameF);
    	pane.add(nodeListL);
    	pane.add(nodeListF);
    	pane.add(go);
    }

    private class disabledFieldsHandler implements ActionListener
    	{
    		public void actionPerformed(ActionEvent e)
    		{
				if (runAll.isSelected())
			    {
			    	testFolderF.setEditable(false);
			    	testNameF.setEditable(false);
			    }
			    else if (runSpecific.isSelected())
			    {
			    	testFolderF.setEditable(true);
			    	testNameF.setEditable(true);
			    }
    		}
    	}


    // Main function
    public static void main(String[] args)
    {
        runTests testGUI = new runTests();
    }

}
